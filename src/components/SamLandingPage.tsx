import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronDown, Instagram, Youtube, Mail, Heart, AlertTriangle } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// =============================================================================
// MOCK DATA - Replace with YouTube API integration
// =============================================================================

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  slug?: string;
}

// TODO: Replace with actual YouTube Data API call
// Channel: @SAMofficieel
// API Endpoint: https://www.googleapis.com/youtube/v3/search
// Requires: YOUTUBE_API_KEY environment variable
const fetchSamVideos = async (): Promise<Video[]> => {
  // Placeholder for YouTube API integration
  // const response = await fetch(
  //   `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=CHANNEL_ID&maxResults=8&order=date&type=video&key=${API_KEY}`
  // );
  // return await response.json();
  
  return MOCK_VIDEOS;
};

const MOCK_VIDEOS: Video[] = [
  { id: '1', title: 'Amber', description: 'Amber is vrolijk, zorgzaam en het middelpunt van haar vriendengroep. Wanneer ze Jeremy ontmoet op een feestje, raakt ze verstrikt in een toxische relatie vol manipulatie en geweld. Ze trekt zich terug van haar vrienden, maar met hun steun vindt ze de kracht om te ontsnappen aan de greep die Jeremy op haar heeft.', thumbnail: '/Amber.jpg', tags: ['trauma'], slug: 'amber' },
  { id: '2', title: 'Het ritje', description: 'Een avond rit die meer is dan alleen een rit.', thumbnail: '/HetRitje.jpg', tags: ['coming soon'], slug: 'het-ritje' },
  { id: '3', title: 'Control', description: 'Een verhaal over een meisje met boulimia en de strijd met controle.', thumbnail: '/Control.jpg', tags: ['eetstoornis'], slug: 'control' },
  { id: '4', title: 'Coming Soon', description: 'Een nieuw verhaal in de maak.', thumbnail: '', tags: ['coming soon'] },
];

const STORY_THEMES = [
  { title: 'Trauma & Herstel', description: 'Verhalen over veerkracht, verwerking en de weg terug naar jezelf na ingrijpende ervaringen.' },
  { title: 'Vrouwenrechten & Feminisme', description: 'De strijd voor gelijkheid, autonomie en respect in een wereld die nog steeds in beweging is.' },
  { title: 'Mentale Gezondheid', description: 'AD(H)D, angst, depressie — thema\'s waar velen mee worstelen maar weinig over durven praten.' },
  { title: 'Eetstoornissen', description: 'De complexe relatie met eten, lichaam en zelfbeeld, verteld met respect en nuance.' },
  { title: 'Relaties & Grenzen', description: 'Over liefde, consent en de moed om je eigen grenzen te bewaken.' },
];

const TEAM_MEMBERS = [
  // Eerste rij
  {
    role: 'REGISSEUR / SCREENPLAY',
    name: 'SAM',
    nameStacked: ['SAM'],
    bio: 'Sam schrijft en regisseert verhalen die gaan over wat je voelt maar niet altijd uitspreekt. Hij heeft een gevoel voor die momenten die je vormen, de stiltes die zwaar zijn, de gedachten die je niet altijd deelt. Zijn verhalen maken zichtbaar wat vaak verborgen blijft, altijd met als doel om herkenning te geven en het gevoel van eenzaamheid te doorbreken.',
    image: '/Sam.jpg',
  },
  {
    role: 'REGISSEUR & PRODUCER',
    name: 'VALENTINO',
    nameStacked: ['VALENTINO'],
    bio: 'Valentino brengt verhalen tot leven met een combinatie van creatieve visie en praktische uitvoering. Hij ziet de potentie in elk verhaal en geeft het de ruimte die het verdient. Met zorg en aandacht begeleidt hij het proces van begin tot einde, altijd gericht op authenticiteit en emotionele impact. Hij creëert een omgeving waarin kwetsbare verhalen tot bloei kunnen komen.',
    image: '/Valentino.jpg',
  },
  // Tweede rij
  {
    role: 'DOP / CAMERAMAN',
    name: 'ANTHONY',
    nameStacked: ['ANTHONY'],
    bio: 'Anthony heeft een scherp oog voor die kleine momenten die grote verhalen vertellen. Hij vangt de blikken en gebaren die vaak onopgemerkt blijven, maar die alles zeggen. Met licht en compositie geeft hij visuele stem aan emoties die moeilijk onder woorden te brengen zijn. Zijn manier van kijken brengt je dichtbij de innerlijke wereld van personages.',
    image: '/Anthony.jpg',
  },
  {
    role: 'DOP / CAMERAMAN',
    name: 'LIUK',
    nameStacked: ['LIUK'],
    bio: 'Liuk benadert zijn werk met geduld en een natuurlijke gevoeligheid voor wat er echt gebeurt. Hij wacht op het juiste moment, het moment waarop iets authentieks zich toont. Zijn manier van filmen is zacht en respectvol, waardoor mensen zich op hun gemak voelen om zich te openen. Hij ziet schoonheid in de rauwe, ongemaakte momenten.',
    image: '/Liuk.jpg',
  },
  // Derde rij
  {
    role: 'CREATIVE PRODUCER & CREATIVE DIRECTOR',
    name: 'POLINA',
    nameStacked: ['POLINA'],
    bio: 'Polina verbindt creatieve visie met de praktische realiteit van het maken. Ze ziet wat een verhaal nodig heeft om zijn volledige potentie te bereiken en maakt het mogelijk. Met aandacht voor detail en gevoel voor nuance bewaakt ze de artistieke integriteit. Ze creëert ruimtes waarin iedereen het beste uit zichzelf kan halen, waarin emoties de ruimte krijgen die ze verdienen.',
    image: '/Polina.jpg',
  },
  {
    role: 'PRODUCTION / MARKETING',
    name: 'MILA',
    nameStacked: ['MILA'],
    bio: 'Mila zorgt ervoor dat verhalen de mensen bereiken die ze nodig hebben. Ze gelooft in de kracht van verbinding en vindt manieren om betekenisvol contact te maken met het publiek. Haar werk gaat niet over verkoop, maar over het delen van verhalen die herkenning kunnen geven. Ze begrijpt dat elk verhaal iemand kan raken, als het op het juiste moment op de juiste plek komt.',
    image: '/Mila.jpg',
  },
  // Vierde rij
  {
    role: 'EDITOR / VFX ARTIST',
    name: 'ROGER',
    nameStacked: ['ROGER'],
    bio: 'Roger geeft vorm aan verhalen door te kiezen wat je ziet en wanneer je het ziet. Hij kent het ritme van emoties en weet precies wanneer een moment stilte nodig heeft of wanneer het tempo moet veranderen. Met subtiele visuele elementen versterkt hij wat er al is, zonder af te leiden van de essentie. In zijn handen krijgen ruwe momenten betekenis en krijgen verhalen hun kracht.',
    image: '/Roger.jpg',
  },
  {
    role: 'HEAD OF MUA',
    name: 'NILI',
    nameStacked: ['NILI'],
    bio: 'Nili werkt met gezichten alsof ze verhalen zijn die gelezen willen worden. Ze ziet wat iemand heeft meegemaakt aan de lijnen en uitdrukkingen, en gebruikt dat als basis voor haar werk. Ze onthult niet, maar maakt zichtbaar wat al aanwezig was. Haar manier van werken is respectvol en authentiek, waardoor mensen zichzelf kunnen zijn en hun verhaal nog beter tot uiting komt.',
    image: '/Nili.jpg',
  },
];

// =============================================================================
// COMPONENT
// =============================================================================

const SamLandingPage = () => {
  // Refs for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const samLogoRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const ourStoryRef = useRef<HTMLElement>(null);
  const ourStoryContentRef = useRef<HTMLDivElement>(null);
  const ourStoryTextRef = useRef<HTMLDivElement>(null);
  const ourStoryBackgroundRef = useRef<HTMLDivElement>(null);
  const triggerWarningRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLElement>(null);
  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const teamCardsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // =========================================================================
      // HERO ANIMATIONS - Sticky with Logo Zoom and Text Reveal
      // =========================================================================
      
      // Spotlight ambient animation
      gsap.to(spotlightRef.current, {
        y: 20,
        opacity: 0.6,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Initial state: Logo far away, text hidden
      if (samLogoRef.current) {
        gsap.set(samLogoRef.current, {
          scale: 0.2,
          opacity: 0.3,
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '50%',
          position: 'absolute',
        });
      }

      if (heroTextRef.current) {
        gsap.set(heroTextRef.current, {
          y: window.innerHeight * 0.3, // Start position - slides up from below
              opacity: 0,
              scale: 0.95,
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '50%',
          position: 'absolute',
        });
      }

      // Create scroll-driven timeline for hero animations
      // Mobile-optimized scrub value
      const isMobile = window.innerWidth < 768;
      const heroScrub = isMobile ? 3 : 2; // Higher scrub = smoother on mobile

      const heroTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
          end: '+=150%', // Longer scroll distance - more time to read
          scrub: heroScrub, // Mobile-optimized scrubbing
          pin: true, // Pin the hero section
          anticipatePin: 1,
          pinSpacing: true, // Add spacing for smooth transition
          id: 'heroPin',
          invalidateOnRefresh: true, // Ensure smooth on resize
              },
            });

      // Phase 1 (0-15%): Logo zooms in from far away
      heroTimeline.to(samLogoRef.current, {
              scale: 1,
        opacity: 1,
        duration: 0.15,
              ease: 'power3.out',
      });

      // Phase 2 (15-30%): Logo stays sticky in center
      heroTimeline.to(samLogoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.15,
        ease: 'none',
      });

      // Phase 3 (30-35%): Logo moves up and fades out - faster to make room for text
      heroTimeline.to(samLogoRef.current, {
        top: '15%',
              opacity: 0,
        scale: 0.9,
        duration: 0.05, // Faster fade out
        ease: 'power3.in',
      });

      // Phase 4 (40-70%): "Ons verhaal" text slides up and becomes FULLY visible
      // Starts later in the scroll - triggered after logo has faded out
      // Symmetrical fade-in timing
      heroTimeline.to(heroTextRef.current, {
        y: 0,
        opacity: 1,
              scale: 1,
        duration: 0.3, // Fade-in duration
              ease: 'power3.inOut', // Smooth bidirectional
      });

      // Phase 5 (70-95%): Text stays sticky AFTER it's already fully visible and in place
      // Long enough to read - extended duration for better readability
      heroTimeline.to(heroTextRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.25, // Extended sticky reading time - text stays visible longer
        ease: 'none',
      });

      // Phase 6 (95-100%): Keep text visible - fade out is handled by crossfade transition below
      // This ensures text stays visible until crossfade takes over
      heroTimeline.to(heroTextRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.05, // Minimal duration - just to keep it visible
        ease: 'none',
      });

      // =========================================================================
      // PARALLAX EFFECT FOR STORY TEXT - Beautiful depth during scroll
      // =========================================================================
      
      if (ourStoryTextRef.current) {
        // Parallax effect: text moves at different speed than scroll
        // Creates a floating, depth-like effect
        // Mobile-optimized parallax
        const parallaxScrub = isMobile ? 3 : 1.5;
        const parallaxDistance = isMobile ? window.innerHeight * 0.1 : window.innerHeight * 0.15; // Less movement on mobile

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: parallaxScrub, // Mobile-optimized scrubbing
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Parallax: move text slower than scroll (creates depth)
            // Starts moving up as you scroll down
            const parallaxY = -progress * parallaxDistance;
            
            // Add subtle opacity variation for depth (less on mobile)
            const opacity = isMobile ? 0.98 + (progress * 0.02) : 0.95 + (progress * 0.05);
            
            // Subtle scale change for depth perception (less on mobile)
            const scale = isMobile ? 1 - (progress * 0.01) : 1 - (progress * 0.02);
            
            gsap.set(ourStoryTextRef.current, {
              y: parallaxY,
              opacity: opacity,
              scale: scale,
              force3D: true, // GPU acceleration
            });
          },
          onLeave: () => {
            // Reset when leaving hero section
            if (ourStoryTextRef.current) {
              gsap.to(ourStoryTextRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          },
          onEnterBack: () => {
            // Smoothly return when scrolling back up
            if (ourStoryTextRef.current) {
              gsap.to(ourStoryTextRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          },
        });
      }

      // Fade out scroll indicator early in the scroll
      if (scrollIndicatorRef.current) {
        heroTimeline.to(scrollIndicatorRef.current, {
            opacity: 0, 
          y: -20,
          duration: 0.1,
          ease: 'power2.in',
        }, '-=0.7');
      }

      // Hover glitch effect on logo
      if (samLogoRef.current) {
        const logo = samLogoRef.current;
        
        const createGlitch = () => {
          const glitchTl = gsap.timeline({ repeat: 3 });
          glitchTl
            .to(logo, {
              x: () => gsap.utils.random(-10, 10),
              y: () => gsap.utils.random(-10, 10),
              filter: `hue-rotate(${gsap.utils.random(-30, 30)}deg)`,
              duration: 0.05,
              ease: 'power2.inOut',
            })
            .to(logo, {
              x: 0,
              y: 0,
              filter: 'hue-rotate(0deg)',
              duration: 0.05,
              ease: 'power2.inOut',
            });
        };

        const resetGlitch = () => {
          gsap.to(logo, {
            x: 0,
            y: 0,
            filter: 'hue-rotate(0deg)',
            duration: 0.2,
            ease: 'power2.out',
          });
        };

        logo.addEventListener('mouseenter', createGlitch);
        logo.addEventListener('mouseleave', resetGlitch);
      }

      // =========================================================================
      // "ONS VERHAAL" TEKST - Animation is handled in hero timeline above
      // No separate animation needed - heroTimeline handles everything
      // =========================================================================
      
      // =========================================================================
      // SMOOTH TRANSITION FROM HERO TO STORIES SECTION - Beautiful Crossfade
      // =========================================================================
      
      if (storiesRef.current && heroTextRef.current) {
        const storiesHeader = storiesRef.current.querySelector('h2');
        
        if (storiesHeader) {
          // Start stories header hidden and positioned
          gsap.set(storiesHeader, {
            opacity: 0,
            y: 50,
            scale: 0.95,
          });

          // Beautiful smooth crossfade transition
          // Hero text fades out while stories header fades in - perfectly synchronized
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'bottom 95%', // Start transition earlier
            end: 'bottom 30%', // Longer, smoother transition zone
            scrub: 2, // Very smooth scrubbing for seamless transition
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = Math.max(0, Math.min(1, self.progress));
              
              // Use smooth easing curve for natural feel
              const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
              
              // Hero text fade out - smooth and gradual
              if (heroTextRef.current) {
                const heroOpacity = 1 - easeProgress;
                const heroY = -30 * easeProgress;
                const heroScale = 1 - (easeProgress * 0.02);
                
                gsap.set(heroTextRef.current, {
                  opacity: Math.max(0, heroOpacity),
                  y: heroY,
                  scale: heroScale,
                });
              }
              
              // Stories header fade in - smooth and gradual, perfectly timed
              const storiesOpacity = easeProgress;
              const storiesY = 40 - (easeProgress * 40);
              const storiesScale = 0.97 + (easeProgress * 0.03);
              
              gsap.set(storiesHeader, {
                opacity: storiesOpacity,
                y: storiesY,
                scale: storiesScale,
              });
            },
          });
        }
      }

      // =========================================================================
      // STORIES HORIZONTAL SCROLL (Desktop only)
      // =========================================================================
      
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const container = storiesContainerRef.current;
        if (!container) return;

        const cards = container.querySelectorAll('.story-card');
        const cardWidth = 240; // lg width
        const gap = 48; // 3rem = 48px - larger consistent gap
        const viewportCenter = window.innerWidth / 2;

        // Reset container to start position first
        gsap.set(container, { x: 0 });
        
        // Function to calculate and set positions
        const calculatePositions = () => {
          const firstCard = cards[0] as HTMLElement;
          const lastCard = cards[cards.length - 1] as HTMLElement;
          
          if (!firstCard || !lastCard) return { initialOffset: 0, scrollDistance: 0 };
          
          // Get actual positions using getBoundingClientRect
          const firstCardRect = firstCard.getBoundingClientRect();
          const lastCardRect = lastCard.getBoundingClientRect();
          
          const firstCardCenter = firstCardRect.left + (firstCardRect.width / 2);
          const lastCardCenter = lastCardRect.left + (lastCardRect.width / 2);
          
          // Calculate how much to move container to center first card
          const initialOffset = firstCardCenter - viewportCenter;
          
          // Calculate scroll distance
          const scrollDistance = lastCardCenter - firstCardCenter;
          
          return { initialOffset, scrollDistance };
        };
        
        // Calculate positions - use requestAnimationFrame to ensure layout is ready
        let initialOffset = 0;
        let scrollDistance = 0;
        let scrollAnimation: gsap.core.Tween | null = null;
        
        // Initial calculation for immediate setup
        const tempPositions = calculatePositions();
        initialOffset = tempPositions.initialOffset;
        scrollDistance = tempPositions.scrollDistance;
        
        // Ensure minimum scroll distance
        if (Math.abs(scrollDistance) < 100) {
          // If cards are too close, calculate based on card width and gap
          const cardCount = cards.length;
          if (cardCount > 1) {
            scrollDistance = (cardWidth + gap) * (cardCount - 1);
          }
        }
        
        // Set initial position
        gsap.set(container, { x: -initialOffset });
        
        // Make scroll end point longer for better sticky experience
        const scrollEnd = Math.max(Math.abs(scrollDistance) * 2.5, 500); // Minimum 500px scroll

        // Initialize all cards - set initial state
        cards.forEach((card) => {
          gsap.set(card, {
            filter: 'blur(0px)',
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            zIndex: 0,
          });
        });

        // Function to calculate and apply blur effects based on card position
        const updateCardEffects = () => {
          cards.forEach((card, i) => {
            const cardRect = (card as HTMLElement).getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distanceFromCenter = cardCenter - viewportCenter;
            const absDistance = Math.abs(distanceFromCenter);
            
            // Blur curve - starts after 30% from center
            const centerZone = window.innerWidth * 0.3;
            const blurStart = centerZone;
            const blurAmount = absDistance > blurStart 
              ? ((absDistance - blurStart) / (window.innerWidth / 2 - blurStart)) * 6
              : 0;
            
            // Opacity: 1 at center, down to 0.6 at edges
            const normalizedDistance = absDistance / (window.innerWidth / 2);
            const clampedDistance = Math.min(normalizedDistance, 1);
            const opacity = 1 - (clampedDistance * 0.4);
            
            // Scale: 1.15 at center, down to 0.9 at edges
            const scale = 1.15 - (clampedDistance * 0.25);
            const zIndex = Math.round((1 - clampedDistance) * 10);
            
            gsap.set(card, {
              filter: `blur(${blurAmount}px)`,
              opacity: opacity,
              scale: scale,
              zIndex: zIndex,
            });
          });
        };

        // Optimize container for performance
        gsap.set(container, { 
          willChange: 'transform',
          force3D: true,
        });

        scrollAnimation = gsap.to(container, {
          x: -initialOffset - scrollDistance, // Move from first card centered to last card centered
          ease: 'none',
          force3D: true, // GPU acceleration
          scrollTrigger: {
            trigger: storiesRef.current,
            start: 'top top',
            end: `+=${scrollEnd}`,
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: 'storiesScroll',
            onEnter: () => {
              // Section is now sticky - immediately apply blur effects
              // Entrance animation should be complete by now (ends at 'top 80%', sticky starts at 'top top')
              updateCardEffects();
            },
            onUpdate: (self) => {
              // Continuously update blur/scale effects when section is pinned (sticky)
              if (self.isActive) {
                updateCardEffects();
              }
            },
            onLeave: () => {
              // Section is no longer sticky - reset cards smoothly
              cards.forEach((card) => {
                gsap.to(card, {
                  filter: 'blur(0px)',
                  opacity: 1,
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                  force3D: false,
                });
              });
              gsap.set(container, { willChange: 'auto' });
            },
          },
        });

        // Update after layout is ready
        requestAnimationFrame(() => {
          const positions = calculatePositions();
          initialOffset = positions.initialOffset;
          scrollDistance = positions.scrollDistance || (cardWidth + gap) * (cards.length - 1);
          
          // Set initial position so first card is centered
          gsap.set(container, { x: -initialOffset });
          
          // Update scroll animation
          if (scrollAnimation) {
            scrollAnimation.vars.x = -initialOffset - scrollDistance;
            ScrollTrigger.refresh();
          }
        });

        // Entrance animation - complete BEFORE sticky section starts
        // Use a separate trigger that ends well before sticky starts to avoid conflicts
        const entranceTrigger = ScrollTrigger.create({
          trigger: storiesRef.current,
          start: 'top 95%', // Start when section enters viewport
          end: 'top 80%', // End well before sticky starts (sticky starts at 'top top')
          scrub: false, // No scrub - smooth one-time animation
          once: true,
          id: 'storiesEntrance',
          onEnter: () => {
            // Animate cards in smoothly
            cards.forEach((card, i) => {
              gsap.fromTo(card,
                { 
                  opacity: 0, 
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  delay: i * 0.1,
                }
              );
            });
          },
        });

        // Add hover effects to all cards
        cards.forEach((card) => {
          // Simple hover effect - just remove blur when hovering
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              filter: 'blur(0px)',
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            // Check if section is sticky before restoring blur
            const scrollTrigger = ScrollTrigger.getById('storiesScroll');
            if (scrollTrigger && scrollTrigger.isActive) {
              // Get current scroll position to restore correct blur
              const cardRect = (card as HTMLElement).getBoundingClientRect();
              const cardCenter = cardRect.left + cardRect.width / 2;
              const absDistance = Math.abs(cardCenter - viewportCenter);
              
              // Restore blur based on position
              const centerZone = window.innerWidth * 0.3;
              const blurStart = centerZone;
              const blurAmount = absDistance > blurStart 
                ? ((absDistance - blurStart) / (window.innerWidth / 2 - blurStart)) * 6
                : 0;
              
              gsap.to(card, {
                filter: `blur(${blurAmount}px)`,
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          });
        });

        // Title animation is handled by crossfade above - no separate animation needed
      });

      // Mobile: horizontal scroll with sticky pinning - similar to desktop
      mm.add('(max-width: 767px)', () => {
        const container = storiesContainerRef.current;
        if (!container) return;

        const cards = container.querySelectorAll('.story-card');
        if (cards.length === 0) return;

        const cardWidth = 280; // Mobile card width - larger for better visibility
        const gap = 24; // 1.5rem = 24px gap on mobile
        const viewportCenter = window.innerWidth / 2;

        // Reset container to start position first
        gsap.set(container, { x: 0 });

        // Function to calculate and set positions for mobile
        const calculatePositions = () => {
          const firstCard = cards[0] as HTMLElement;
          const lastCard = cards[cards.length - 1] as HTMLElement;

          if (!firstCard || !lastCard) return { initialOffset: 0, scrollDistance: 0 };

          // Get actual positions
          const firstCardRect = firstCard.getBoundingClientRect();
          const lastCardRect = lastCard.getBoundingClientRect();

          const firstCardCenter = firstCardRect.left + (firstCardRect.width / 2);
          const lastCardCenter = lastCardRect.left + (lastCardRect.width / 2);

          // Calculate how much to move container to center first card
          const initialOffset = firstCardCenter - viewportCenter;

          // Calculate scroll distance
          const scrollDistance = lastCardCenter - firstCardCenter;

          return { initialOffset, scrollDistance };
        };

        let initialOffset = 0;
        let scrollDistance = 0;
        let scrollAnimation: gsap.core.Tween | null = null;

        // Initial calculation
        const tempPositions = calculatePositions();
        initialOffset = tempPositions.initialOffset;
        scrollDistance = tempPositions.scrollDistance;

        // Ensure minimum scroll distance
        if (Math.abs(scrollDistance) < 100) {
          const cardCount = cards.length;
          if (cardCount > 1) {
            scrollDistance = (cardWidth + gap) * (cardCount - 1);
          }
        }

        // Set initial position
        gsap.set(container, { x: -initialOffset });

        // Initialize all cards
        cards.forEach((card) => {
          gsap.set(card, {
            filter: 'blur(0px)',
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            zIndex: 0,
          });
        });

        // Function to calculate and apply blur/scale effects based on card position (mobile)
        // Optimized for mobile: reduced blur, throttled updates
        let rafId: number | null = null;
        const updateCardEffects = () => {
          if (rafId) return; // Skip if already scheduled
          
          rafId = requestAnimationFrame(() => {
            cards.forEach((card) => {
              const cardRect = (card as HTMLElement).getBoundingClientRect();
              const cardCenter = cardRect.left + cardRect.width / 2;
              const distanceFromCenter = cardCenter - viewportCenter;
              const absDistance = Math.abs(distanceFromCenter);

              // Minimal blur on mobile for performance - only at edges
              const centerZone = window.innerWidth * 0.3;
              const blurStart = centerZone;
              const blurAmount = absDistance > blurStart
                ? ((absDistance - blurStart) / (window.innerWidth / 2 - blurStart)) * 2 // Much less blur on mobile
                : 0;

              // Opacity: 1 at center, down to 0.8 at edges (less fade for performance)
              const normalizedDistance = absDistance / (window.innerWidth / 2);
              const clampedDistance = Math.min(normalizedDistance, 1);
              const opacity = 1 - (clampedDistance * 0.2);

              // Scale: 1.08 at center, down to 0.97 at edges (less scale for performance)
              const scale = 1.08 - (clampedDistance * 0.11);
              const zIndex = Math.round((1 - clampedDistance) * 10);

              gsap.set(card, {
                filter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : 'none', // Only apply blur if significant
                opacity: opacity,
                scale: scale,
                zIndex: zIndex,
                force3D: true, // GPU acceleration
              });
            });
            rafId = null;
          });
        };

        // Make scroll end point longer for better sticky experience on mobile
        const scrollEnd = Math.max(Math.abs(scrollDistance) * 3, 400); // Minimum 400px scroll on mobile

        // Optimize container for mobile performance
        gsap.set(container, { 
          willChange: 'transform',
          force3D: true,
        });

        scrollAnimation = gsap.to(container, {
          x: -initialOffset - scrollDistance,
          ease: 'none',
          force3D: true, // GPU acceleration
          scrollTrigger: {
            trigger: storiesRef.current,
            start: 'top top',
            end: `+=${scrollEnd}`,
            pin: true,
            scrub: 3, // Higher scrub value = less frequent updates = smoother on mobile
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: 'storiesScrollMobile',
            onEnter: () => {
              updateCardEffects();
            },
            onUpdate: (self) => {
              if (self.isActive) {
                updateCardEffects();
              }
            },
            onLeave: () => {
              // Reset cards smoothly
              cards.forEach((card) => {
                gsap.to(card, {
                  filter: 'none',
                  opacity: 1,
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                  force3D: false,
                });
              });
              gsap.set(container, { willChange: 'auto' });
            },
          },
        });

        // Update after layout is ready
        requestAnimationFrame(() => {
          const positions = calculatePositions();
          initialOffset = positions.initialOffset;
          scrollDistance = positions.scrollDistance || (cardWidth + gap) * (cards.length - 1);

          // Set initial position so first card is centered
          gsap.set(container, { x: -initialOffset });

          // Update scroll animation
          if (scrollAnimation) {
            scrollAnimation.vars.x = -initialOffset - scrollDistance;
            ScrollTrigger.refresh();
          }
        });

        // Entrance animation - complete BEFORE sticky section starts
        const entranceTrigger = ScrollTrigger.create({
          trigger: storiesRef.current,
          start: 'top 95%',
          end: 'top 80%',
          scrub: false,
          once: true,
          id: 'storiesEntranceMobile',
          onEnter: () => {
            // Animate cards in smoothly
            cards.forEach((card, i) => {
              gsap.fromTo(card,
                {
                  opacity: 0,
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  delay: i * 0.08, // Faster stagger on mobile
                }
              );
            });
          },
        });

        // Handle resize on mobile
        const handleResize = () => {
          const positions = calculatePositions();
          initialOffset = positions.initialOffset;
          scrollDistance = positions.scrollDistance || (cardWidth + gap) * (cards.length - 1);

          gsap.set(container, { x: -initialOffset });

          if (scrollAnimation) {
            scrollAnimation.vars.x = -initialOffset - scrollDistance;
            ScrollTrigger.refresh();
          }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          if (entranceTrigger) entranceTrigger.kill();
        };
      });

      // =========================================================================
      // TEAM CARDS ANIMATION - Mobile-optimized
      // =========================================================================
      
      const teamScrub = isMobile ? 3 : 2;
      
      gsap.fromTo('.team-card',
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: { amount: 1.2, from: 'random' }, // Langzamere stagger
          force3D: true, // GPU acceleration
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: teamScrub, // Mobile-optimized
          },
        }
      );

      // =========================================================================
      // ABOUT SECTION ANIMATION - Mobile-optimized
      // =========================================================================
      
      const aboutScrub = isMobile ? 3 : 2;
      
      gsap.fromTo('.about-content',
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          force3D: true, // GPU acceleration
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: aboutScrub, // Mobile-optimized
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center grain vignette overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}
      >
        {/* Spotlight effect */}
        <div 
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'var(--gradient-spotlight)' }}
        />
        
        {/* Ambient light beams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sam-amber/5 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-sam-amber/3 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>

        {/* SAM Logo - animated with zoom */}
        <img
          ref={samLogoRef}
                src="/sam-logo.png"
                alt="SAM"
          className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl h-auto pointer-events-auto cursor-pointer z-30 px-4 sm:px-6"
          style={{ objectFit: 'contain', transformOrigin: '50% 50%', position: 'relative' }}
        />

        {/* Hero Text Content - "Ons verhaal" - animated with slide up */}
        <div 
          ref={heroTextRef}
          className="relative z-30 w-full max-w-[90%] sm:max-w-[500px] md:max-w-[550px] px-4 sm:px-6 mx-auto"
        >
          <div 
            ref={ourStoryContentRef}
            className="text-center"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: 'transparent',
              padding: '1rem 0',
            }}
          >
            {/* Story text - monospace, centered, justify layout as one block */}
            <div 
              ref={ourStoryTextRef}
              className="story-block text-sm sm:text-base md:text-lg text-foreground mx-auto"
              style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '0.03em',
                lineHeight: '1.6',
                textAlign: 'justify',
                whiteSpace: 'pre-line',
                maxWidth: '100%',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              <span className="text-gradient-amber">SAM</span> ontstaat in de ruimte tussen wat je voelt en wat je liever verbergt.{'\n\n'}
              We raken aan momenten die je vormen,{'\n'}
              stiltes die zwaar zijn, gedachten die je niet altijd deelt.{'\n\n'}
              We maken zichtbaar wat vaak verborgen blijft, niet om het donker groter te maken,{'\n'}
              maar om het minder eenzaam te laten voelen.{'\n\n'}
              <span className="text-gradient-amber">SAM</span> wil <span className="text-gradient-amber">herkenning</span> geven. <span className="text-gradient-amber">Warmte</span> in het stille midden. Een zachte hand op je schouder. Een fluistering: "Je bent niet <span className="text-gradient-amber">alleen</span>."
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
            <span className="text-xs font-medium">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

        {/* Cinematic frame overlay */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
      </section>

      {/* ===================================================================== */}
      {/* STORIES SECTION - Horizontal Scroll with Film Posters */}
      {/* ===================================================================== */}
      <section 
        ref={storiesRef} 
        id="stories"
        className="relative min-h-screen py-20 md:py-0 overflow-hidden flex flex-col md:block md:items-start"
      >
        {/* Vignette overlay - donkere zijkanten, helder midden */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.8) 100%)',
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-0 relative z-20 w-full flex-1 flex flex-col justify-start md:justify-center md:block pt-16 md:pt-0">
          {/* Section header - visible on mobile, pinned content on desktop */}
          <div className="md:absolute md:top-8 md:left-6 md:z-20 mb-16 md:mb-0 text-center md:text-left">
            <h2 className="font-display text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Onze
            </h2>
          </div>

          {/* Horizontal scroll container with film posters */}
          <div 
            ref={storiesContainerRef}
            className="flex flex-row md:flex-row md:pl-[50vw] md:pr-20 md:items-center md:min-h-screen md:justify-center items-center"
            style={{ 
              gap: '1.5rem' // 1.5rem on mobile, 3rem on desktop is handled by GSAP gap calculation
            }}
          >
            {MOCK_VIDEOS.map((video, index) => {
              const cardContent = (
                <>
                {/* Film poster image - fills entire card */}
                <img 
                  src={video.thumbnail || `https://picsum.photos/seed/${video.id}/400/600`}
                  alt={video.title}
                  className="block"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    margin: 0,
                    padding: 0,
                    minWidth: '100%',
                    minHeight: '100%',
                    ...(video.title.toLowerCase() === 'amber' ? {
                      width: '150%',
                      height: '150%',
                      objectFit: 'cover'
                    } : {})
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                    {/* Fallback gradient - subtle warm tones */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/30 via-stone-900/30 to-neutral-900/30" />
                
                {/* Dark overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                {/* Film info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 z-10">
                  {/* Category */}
                  <div className="text-[10px] md:text-xs font-medium text-white/70 uppercase tracking-[0.2em] mb-1.5">
                    {video.tags[0]?.toUpperCase() || 'VERHAAL'}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                    {video.title.toUpperCase()}
                  </h3>
                  
                  {/* Film details */}
                  <div className="space-y-1.5 text-[9px] md:text-[10px] text-white/60 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-3">
                      <span className="text-white/50">YEAR</span>
                      <span className="text-white/90">{video.title.toLowerCase() === 'amber' ? '2024' : '2025'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/50">CATEGORY</span>
                      <span className="text-white/90">{video.tags[0]?.toUpperCase() || 'VERHAAL'}</span>
                    </div>
                  </div>
                </div>
                </>
              );
              
              if (video.slug) {
                return (
                  <Link
                    key={video.id}
                    to={`/films/${video.slug}`}
                    data-video-index={index}
                    className="story-card flex-shrink-0 w-[280px] md:w-[220px] lg:w-[240px] group cursor-pointer relative aspect-[2/3] rounded-xl overflow-hidden block"
                    style={{
                      filter: 'blur(0px)',
                      opacity: 1,
                      transform: 'scale(1)',
                      padding: 0,
                      margin: 0,
                      textDecoration: 'none'
                    }}
                  >
                    {cardContent}
                  </Link>
                );
              }
              
              return (
                <div
                  key={video.id}
                  data-video-index={index}
                  className="story-card flex-shrink-0 w-[280px] md:w-[220px] lg:w-[240px] group cursor-pointer relative aspect-[2/3] rounded-xl overflow-hidden"
                  style={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    transform: 'scale(1)',
                    padding: 0,
                    margin: 0
                  }}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* ===================================================================== */}
      {/* TEAM SECTION */}
      {/* ===================================================================== */}
      <section ref={teamRef} className="relative py-24 md:py-32 grain vignette min-h-screen" style={{ background: 'var(--gradient-story-section)' }}>
        {/* Ambient light effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sam-amber/5 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-sam-soft-purple/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header rechtsboven - cinematic ticket style */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10 flex flex-col items-end gap-3">
          <div className="text-foreground/60 text-xs md:text-sm font-medium uppercase tracking-[0.2em] font-mono">SAM</div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-sam-amber/30 to-transparent"></div>
          <div className="text-sam-amber/70 text-[10px] md:text-xs font-medium uppercase tracking-[0.25em] font-mono">
            {String(TEAM_MEMBERS.length).padStart(3, '0')}
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Team <span className="text-gradient-amber">SAM</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-sam-amber/50 to-transparent mx-auto mt-6"></div>
          </div>

          {/* Team profiles - side by side */}
          <div ref={teamCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={index}
                className="team-card relative bg-card/40 backdrop-blur-sm rounded-xl border border-border/40 p-8 md:p-12 lg:p-14 transition-all duration-500 hover:bg-card/60 hover:border-sam-amber/30 cinematic-border group"
              >
                {/* Profile layout: image left, text right */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                  {/* Image - with subtle cinematic glow */}
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <div className="w-full md:w-48 lg:w-56 aspect-[3/4] relative overflow-hidden rounded-lg bg-card border border-border/30 group-hover:border-sam-amber/40 transition-colors duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale transition-all duration-500"
                        style={{ filter: 'grayscale(100%)' }}
                      />
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-tr from-sam-amber/10 via-transparent to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Role label */}
                    <div className="text-sam-amber/70 text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] mb-4 font-mono">
                      {member.role}
                    </div>

                    {/* Name - stacked vertically with gradient accent */}
                    <div className="mb-6 space-y-0">
                      {member.nameStacked.map((namePart, i) => (
                        <h3
                          key={i}
                          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15] tracking-tight group-hover:text-gradient-amber transition-all duration-500"
                        >
                          {namePart}
                        </h3>
                      ))}
                    </div>

                    {/* Biography */}
                    <p className="text-muted-foreground text-sm md:text-[15px] leading-relaxed max-w-none group-hover:text-foreground/90 transition-colors duration-500">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-sam-amber/20 group-hover:border-sam-amber/50 transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-sam-amber/20 group-hover:border-sam-amber/50 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* ABOUT SECTION */}
      {/* ===================================================================== */}
      <section ref={aboutRef} className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="about-content max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Over <span className="text-gradient-amber">SAM</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-12">
              <p>
                SAM bestaat om verhalen te vertellen die ertoe doen. Verhalen over thema's waar veel mensen mee worstelen, maar waar vaak niet over gepraat wordt. Door middel van fictie maken we het bespreekbaar, herkenbaar en menselijk.
              </p>
              <p>
                Elk verhaal is fictief, maar gebaseerd op echte gevoelens en ervaringen. We geloven dat storytelling de kracht heeft om te verbinden, te troosten en te inspireren tot verandering.
              </p>
            </div>

            {/* Trigger warning */}
            <div className="p-6 bg-card/50 rounded-xl border border-sam-amber/20 text-left">
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-sam-amber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Let op
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Sommige verhalen kunnen heftig zijn en thema's bevatten zoals trauma, geweld of eetstoornissen. Kijk wanneer je er emotioneel klaar voor bent. Je staat er niet alleen voor — zoek hulp als je die nodig hebt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* FOOTER */}
      {/* ===================================================================== */}
      <footer className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="text-center md:text-left">
              <img 
                src="/sam-logo.png" 
                alt="SAM" 
                className="h-12 md:h-14 w-auto mx-auto md:mx-0"
              />
              <p className="text-muted-foreground text-sm mt-2">
                Verhalen die ertoe doen.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.youtube.com/@SAMofficieel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="mailto:contact@sam.nl"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Help resources */}
          <div className="mt-12 pt-8 border-t border-border/20 text-center">
            <p className="text-muted-foreground text-sm">
              Zoek je hulp? Neem contact op met een professional of hulplijn in jouw regio.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-4">
              © {new Date().getFullYear()} SAM. Alle rechten voorbehouden.
            </p>
            <p className="text-muted-foreground/50 text-xs mt-6">
              Powered by <span className="text-foreground/70">VETA-Media</span> en <span className="text-foreground/70">Haarlem studio</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SamLandingPage;