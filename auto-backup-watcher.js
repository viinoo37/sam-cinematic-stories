#!/usr/bin/env node
/**
 * Automatische backup watcher
 * Monitort bestandswijzigingen en commit automatisch naar GitHub na 20 seconden
 * Start met: npm run auto-backup
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_DIR = process.cwd();
const GIT_DIR = path.join(PROJECT_DIR, '.git');
const IGNORE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /\.git-backup\.log/,
  /\.DS_Store/,
  /\.vscode/,
  /\.idea/,
];

let pendingChanges = new Set();
let commitTimeout = null;
let isCommitting = false;

// Check of we in een Git repository zijn
if (!fs.existsSync(GIT_DIR)) {
  console.error('❌ Dit is geen Git repository. Run eerst: git init');
  process.exit(1);
}

// Check of fswatch beschikbaar is (macOS/Linux)
function checkFswatch() {
  try {
    execSync('which fswatch', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Git status checken
function hasChanges() {
  try {
    const status = execSync('git status --porcelain', { 
      encoding: 'utf8',
      cwd: PROJECT_DIR 
    });
    return status.trim().length > 0;
  } catch {
    return false;
  }
}

// Automatisch commit en push
function autoCommit() {
  if (isCommitting || !hasChanges()) {
    return;
  }

  isCommitting = true;
  const timestamp = new Date().toLocaleString('nl-NL');
  
  try {
    console.log(`\n📦 Automatische backup gestart... (${timestamp})`);
    
    // Stage alle wijzigingen
    execSync('git add -A', { 
      cwd: PROJECT_DIR,
      stdio: 'inherit' 
    });
    
    // Commit met timestamp
    const commitMessage = `Auto-backup: ${timestamp}`;
    execSync(`git commit -m "${commitMessage}"`, { 
      cwd: PROJECT_DIR,
      stdio: 'inherit' 
    });
    
    // Push naar GitHub
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { 
      encoding: 'utf8',
      cwd: PROJECT_DIR 
    }).trim();
    
    // Push naar GitHub met error handling
    try {
      execSync(`git push origin ${branch}`, { 
        cwd: PROJECT_DIR,
        stdio: 'pipe' // Gebruik pipe om errors te kunnen vangen
      });
      console.log('✅ Backup voltooid en naar GitHub gepusht!\n');
    } catch (pushError) {
      const errorMsg = pushError.stderr?.toString() || pushError.message || 'Onbekende fout';
      console.error('⚠️  Push naar GitHub mislukt:', errorMsg);
      console.error('💡 Tip: Controleer je GitHub authenticatie of run: git push origin main\n');
      // Log de error maar gooi niet de hele backup weg
    }
    
    // Log naar backup log met commit hash
    const logFile = path.join(PROJECT_DIR, '.git-backup.log');
    const commitHash = execSync('git rev-parse --short HEAD', { 
      encoding: 'utf8',
      cwd: PROJECT_DIR 
    }).trim();
    const commitMsg = execSync('git log -1 --pretty=format:"%s"', { 
      encoding: 'utf8',
      cwd: PROJECT_DIR 
    }).trim();
    const logEntry = `[${timestamp}] Auto-backup voltooid | Commit: ${commitHash} | ${commitMsg}\n`;
    fs.appendFileSync(logFile, logEntry);
    
    pendingChanges.clear();
  } catch (error) {
    console.error('⚠️  Fout bij backup:', error.message);
  } finally {
    isCommitting = false;
  }
}

// Start commit na 20 seconden
function scheduleCommit(filePath) {
  if (IGNORE_PATTERNS.some(pattern => pattern.test(filePath))) {
    return;
  }
  
  pendingChanges.add(filePath);
  
  // Clear bestaande timeout
  if (commitTimeout) {
    clearTimeout(commitTimeout);
  }
  
  // Nieuwe timeout voor 20 seconden
  commitTimeout = setTimeout(() => {
    autoCommit();
  }, 20000); // 20 seconden
  
  console.log(`📝 Wijziging gedetecteerd: ${path.relative(PROJECT_DIR, filePath)}`);
  console.log(`⏱️  Backup over 20 seconden...`);
}

// Start file watcher
function startWatcher() {
  if (checkFswatch()) {
    console.log('🚀 Automatische backup watcher gestart (fswatch)');
    console.log('📁 Monitort wijzigingen in:', PROJECT_DIR);
    console.log('⏱️  Backup na 20 seconden inactiviteit\n');
    
    const fswatch = spawn('fswatch', [
      '-r',           // Recursief
      '-l', '1',      // Latency 1 seconde
      '--exclude', 'node_modules',
      '--exclude', '.git',
      '--exclude', 'dist',
      '--exclude', '.git-backup.log',
      PROJECT_DIR
    ]);
    
    fswatch.stdout.on('data', (data) => {
      const files = data.toString().trim().split('\n');
      files.forEach(file => {
        if (file.trim()) {
          scheduleCommit(file);
        }
      });
    });
    
    fswatch.stderr.on('data', (data) => {
      console.error('fswatch error:', data.toString());
    });
    
    fswatch.on('close', (code) => {
      console.log(`\n⚠️  File watcher gestopt (code: ${code})`);
    });
    
    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n\n🛑 Backup watcher gestopt');
      if (commitTimeout) {
        clearTimeout(commitTimeout);
      }
      fswatch.kill();
      process.exit(0);
    });
    
  } else {
    console.error('❌ fswatch niet gevonden. Installeer met: brew install fswatch');
    console.log('\n💡 Alternatief: Gebruik de Cursor/VSCode Git extensie voor automatische commits');
    process.exit(1);
  }
}

// Start de watcher
startWatcher();

