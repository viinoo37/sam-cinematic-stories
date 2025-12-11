# Prompt voor AI Agent - SAM Landing Page

Je werkt aan een **cinematische, volledig geanimeerde landing page** voor het Nederlandse YouTube storytelling project "SAM" (@SAMofficieel).

## Tech Stack
- React 18.3.1 + TypeScript
- Vite 5.4.19 (dev server op poort 3000)
- Tailwind CSS 3.4.17
- GSAP 3.13.0 + ScrollTrigger
- shadcn/ui componenten (Radix UI)

## Belangrijkste Implementatie: Hero Sectie Sticky Scroll

De hero sectie is **volledig sticky/pinned** tijdens scroll. De hero blijft gefixeerd tot alle animaties klaar zijn.

### Logo Animatie (SAM Logo - `/sam-logo.png`)
- **Start**: Ver weg (scale: 0.2, opacity: 0.3), perfect gecentreerd
- **Phase 1 (0-20%)**: Zoom in naar center (scale: 0.2→1, opacity: 0.3→1)
- **Phase 2 (20-50%)**: Sticky in center, geen beweging
- **Phase 3 (50-70%)**: Beweegt omhoog (top: 15%), fade out (opacity: 1→0, scale: 1→0.9)
- **Hover**: Glitch effect (random x/y + hue-rotate, 3x repeat)
- **Centering**: `xPercent: -50, yPercent: -50, left: '50%', top: '50%', position: 'absolute'`

### Tekst Animatie
- **Start**: Onder (y: window.innerHeight * 0.5), opacity: 0, scale: 0.95
- **Phase 4 (70-100%)**: Schuift omhoog (y: 0), wordt zichtbaar (opacity: 1, scale: 1)
- **Centering**: Zelfde techniek als logo

### ScrollTrigger Config
```javascript
ScrollTrigger.create({
  trigger: heroRef.current,
  start: 'top top',
  end: '+=80%',
  scrub: 1.5,
  pin: true, // Hero blijft sticky
  anticipatePin: 1,
  pinSpacing: true,
  id: 'heroPin',
});
```

## Achtergrond
- **Kleur**: Volledig zwart (`--background: 0 0% 0%`, `--gradient-hero: #000000`)
- **Grain**: SVG noise texture (3% opacity)
- **Vignette**: Radiale gradient (transparant → zwart 80%)
- **Spotlight**: Radiale amber gradient (8% opacity), geanimeerd
- **Ambient Lights**: Twee blur circles met pulse glow

## Belangrijke Code Patterns

### Perfect Centering (GEEN CSS transform classes tegelijk!)
```javascript
gsap.set(element, {
  xPercent: -50,
  yPercent: -50,
  left: '50%',
  top: '50%',
  position: 'absolute',
});
```

### GSAP Context Cleanup
```javascript
const ctx = gsap.context(() => { /* animaties */ });
return () => ctx.revert();
```

## Huidige Status
✅ Hero sticky met logo zoom + tekst reveal  
✅ Logo hover glitch effect  
✅ Volledig zwarte achtergrond  
✅ Alle achtergrond effecten  
✅ Stories, Videos, Team, About, Footer secties  

⚠️ TODO: YouTube API integratie

## Bestandslocaties
- Hoofdcomponent: `src/components/SamLandingPage.tsx`
- Styles: `src/index.css`
- Logo: `public/sam-logo.png`

## Belangrijk
- **NOOIT** CSS `transform` classes (`-translate-x-1/2`) tegelijk gebruiken met GSAP `xPercent/yPercent`
- Hero pin duurt 80% viewport height
- Scrub: 1.5 voor smooth animaties
- Ease: `power3.out` en `power3.in`

---

**Gebruik deze informatie om verder te werken aan de SAM landing page. Behoud alle bestaande animaties en functionaliteit.**



