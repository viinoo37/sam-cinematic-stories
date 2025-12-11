# SAM Landing Page - Project Beschrijving

## Overzicht
Dit is een **cinematische, volledig geanimeerde landing page** voor het Nederlandse YouTube storytelling project **"SAM"** (@SAMofficieel). De pagina is gebouwd met React, TypeScript, Tailwind CSS en GSAP voor geavanceerde scroll-gebaseerde animaties.

## Tech Stack
- **Framework**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: GSAP 3.13.0 + ScrollTrigger plugin
- **UI Components**: Radix UI (shadcn/ui componenten)
- **Icons**: Lucide React
- **Routing**: React Router DOM 6.30.1
- **Development Server**: Draait op poort 3000 (geconfigureerd in `vite.config.ts`)

## Belangrijkste Features

### 1. Hero Sectie - Volledig Sticky Scroll Animatie

De hero sectie is **volledig sticky/pinned** tijdens de scroll animatie. De hero blijft gefixeerd tot alle animaties klaar zijn, en kan daarna pas omhoog scrollen.

#### Logo Animatie (SAM Logo)
- **Start State**: Logo begint ver weg (scale: 0.2, opacity: 0.3), perfect gecentreerd
- **Phase 1 (0-20% scroll)**: Logo zoomt in naar center (scale: 0.2 → 1, opacity: 0.3 → 1)
- **Phase 2 (20-50% scroll)**: Logo blijft sticky in het midden, geen beweging
- **Phase 3 (50-70% scroll)**: Logo beweegt omhoog naar top: 15% en fade out (opacity: 1 → 0, scale: 1 → 0.9)
- **Hover Effect**: Glitch effect op hover - random x/y bewegingen en hue-rotate filter voor 3 herhalingen
- **Centering**: Gebruikt `xPercent: -50, yPercent: -50, left: '50%', top: '50%', position: 'absolute'` voor perfecte centering

#### Tekst Animatie
- **Start State**: Tekst begint onderaan (y: window.innerHeight * 0.5), opacity: 0, scale: 0.95
- **Phase 4 (70-100% scroll)**: Tekst schuift omhoog naar center (y: 0), wordt volledig zichtbaar (opacity: 1, scale: 1)
- **Centering**: Zelfde centering techniek als logo (`xPercent: -50, yPercent: -50`)

#### Scroll Indicator
- Scroll indicator onderaan de hero sectie
- Fade out animatie tijdens scroll (opacity: 0, y: -20) vroeg in de scroll timeline

#### ScrollTrigger Configuratie
```javascript
ScrollTrigger.create({
  trigger: heroRef.current,
  start: 'top top',
  end: '+=80%', // Totale scroll afstand voor alle animaties
  scrub: 1.5, // Smooth scrubbing
  pin: true, // Hero sectie blijft sticky
  anticipatePin: 1,
  pinSpacing: true,
  id: 'heroPin',
});
```

### 2. Achtergrond & Visuele Effecten

#### Achtergrond
- **Kleur**: Volledig zwart (#000000, `--background: 0 0% 0%`)
- **Gradient**: `--gradient-hero: #000000` (geen gradient, puur zwart)
- **Grain Texture**: SVG noise pattern overlay met 3% opacity
- **Vignette**: Radiale gradient van transparant naar zwart (80% opacity)
- **Spotlight**: Radiale gradient van amber (8% opacity) naar transparant, geanimeerd met yoyo

#### Ambient Light Beams
- Twee grote blur circles met amber kleur (5% en 3% opacity)
- Pulse glow animatie met verschillende delays
- Positioned op top-1/4 left-1/4 en bottom-1/3 right-1/4

#### Cinematic Frame Overlays
- Gradient overlays boven en onder de hero sectie
- Zorgt voor cinemascope-achtige framing

### 3. Secties

#### Stories Sectie
- **Desktop**: Horizontale scroll met pinned container
- **Mobile**: Verticale stack met fade-in animaties
- Toont 5 story themes (Trauma & Herstel, Vrouwenrechten & Feminisme, etc.)

#### Videos Sectie
- Grid layout met video cards
- Fade-in en scale animaties bij scroll
- Placeholder voor YouTube API integratie

#### Team Sectie
- Grid met team rollen (Regisseur, Producer, Scriptschrijver, etc.)
- Staggered random fade-in animaties

#### About Sectie
- Centered content met fade-in
- Trigger warning sectie met Heart icon

#### Footer
- Links naar YouTube, Instagram, Email
- Copyright informatie
- Help resources sectie

### 4. Styling Details

#### Kleuren (HSL)
- **Background**: `0 0% 0%` (zwart)
- **Foreground**: `40 20% 92%` (warm wit)
- **Primary/SAM Amber**: `38 72% 62%`
- **Muted**: `0 0% 15%`

#### Typography
- **Display Font**: 'Playfair Display' (serif) voor headings
- **Body Font**: 'Inter' (sans-serif) voor body text
- **Font Sizes**: Responsive met clamp() waar nodig

#### Utility Classes
- `.text-gradient-amber`: Gradient text effect
- `.grain`: Noise texture overlay
- `.vignette`: Dark vignette effect
- `.cinematic-border`: Border met amber glow shadow
- `.glow-amber`: Amber glow shadow effect

### 5. Bestandsstructuur

```
src/
├── components/
│   ├── SamLandingPage.tsx    # Hoofdcomponent met alle animaties
│   └── ui/                    # shadcn/ui componenten
├── index.css                  # Global styles, CSS variables, utilities
├── main.tsx                   # Entry point
└── pages/
    ├── Index.tsx
    └── NotFound.tsx
```

### 6. Belangrijke Code Patterns

#### GSAP Context & Cleanup
```javascript
const ctx = gsap.context(() => {
  // Alle GSAP animaties hier
});

return () => ctx.revert(); // Cleanup
```

#### Perfect Centering Pattern
```javascript
gsap.set(element, {
  xPercent: -50,
  yPercent: -50,
  left: '50%',
  top: '50%',
  position: 'absolute',
});
```

#### Scroll-Driven Timeline
```javascript
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: element,
    start: 'top top',
    end: '+=80%',
    scrub: 1.5,
    pin: true,
  },
});
```

### 7. Huidige Status

✅ **Voltooid:**
- Hero sectie volledig sticky met logo zoom en tekst reveal
- Logo hover glitch effect
- Volledig zwarte achtergrond
- Alle achtergrond effecten (grain, vignette, spotlight, ambient lights)
- Scroll indicator met fade out
- Alle andere secties (Stories, Videos, Team, About, Footer)
- Responsive design
- Smooth scroll animaties

⚠️ **TODO:**
- YouTube API integratie voor echte video data
- Video thumbnails toevoegen
- Mogelijk meer content of secties toevoegen

### 8. Development

**Server starten:**
```bash
npm run dev
```
Server draait op `http://localhost:3000`

**Build:**
```bash
npm run build
```

### 9. Belangrijke Notities

- **Logo**: Gebruikt `/sam-logo.png` in de public folder
- **Centering**: Altijd `xPercent: -50, yPercent: -50` gebruiken voor perfecte centering, NOOIT CSS transform classes zoals `-translate-x-1/2` tegelijk gebruiken
- **Pin Duration**: Hero pin duurt 80% van de viewport height (`end: '+=80%'`)
- **Scrub Value**: 1.5 voor smooth, niet te abrupte animaties
- **Ease Functions**: `power3.out` en `power3.in` voor smooth transitions

### 10. Animatie Timeline Overzicht

1. **0-20%**: Logo zoomt in (scale 0.2 → 1, opacity 0.3 → 1)
2. **20-50%**: Logo blijft sticky in center
3. **50-70%**: Logo beweegt omhoog en fade out
4. **70-100%**: Tekst schuift omhoog en wordt zichtbaar
5. **Vroeg in scroll**: Scroll indicator fade out

Alle animaties zijn gesynchroniseerd binnen één GSAP timeline die gekoppeld is aan scroll positie via ScrollTrigger.

---

**Laatste update**: Hero sectie is volledig sticky, logo en tekst animaties werken perfect, achtergrond is volledig zwart, alle componenten zijn aanwezig.


