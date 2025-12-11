import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import FilmStillsMarquee from './FilmStillsMarquee';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// =============================================================================
// TYPES
// =============================================================================

interface Film {
  title: string;
  slug: string;
  year: number;
  duration: number; // in minutes
  themes: string[];
  shortLogline: string;
  longSynopsis: string;
  stills: string[];
  heroImage?: string;
  crew: {
    name: string;
    role: string;
  }[];
  youtubeUrl: string;
  triggerWarning?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

interface SamFilmDetailPageProps {
  film: Film;
}

const SamFilmDetailPage = ({ film }: SamFilmDetailPageProps) => {
  // Refs for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroLoglineRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);
  
  const storySectionRef = useRef<HTMLElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);
  const themesSectionRef = useRef<HTMLElement>(null);
  const themesContainerRef = useRef<HTMLDivElement>(null);
  
  const watchSectionRef = useRef<HTMLElement>(null);
  const youtubeContainerRef = useRef<HTMLDivElement>(null);
  
  const creditsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Mobile detection - available for all sections
      const isMobile = window.innerWidth < 768;

      // =========================================================================
      // HERO ANIMATIONS - Pinned with parallax zoom
      // =========================================================================
      
      if (heroRef.current && heroImageRef.current) {
        // Initial state - title visible immediately
        gsap.set(heroTitleRef.current, { y: 0, opacity: 1 });
        gsap.set(heroLoglineRef.current, { y: 40, opacity: 0 });
        gsap.set(heroMetaRef.current, { y: 20, opacity: 0 });

        // Mobile-optimized scrub value
        const heroScrub = isMobile ? 3 : 1.5;

        // Hero pinned timeline
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: heroScrub, // Mobile-optimized
            pin: true,
            anticipatePin: 1,
            id: 'heroPin',
          },
        });

        // Phase 1: Logline fade in (title already visible)
        heroTimeline.to(heroLoglineRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
        }, 0.1);

        heroTimeline.to(heroMetaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.1');

        // Phase 2: Subtle parallax zoom on background
        heroTimeline.to(heroImageRef.current, {
          scale: 1.1,
          duration: 0.4,
          ease: 'none',
        }, '-=0.1');

        // Phase 3: Hero breathes out - title moves up slightly
        heroTimeline.to(heroContentRef.current, {
          y: -30,
          opacity: 0.7,
          duration: 0.3,
          ease: 'power2.in',
        }, '-=0.2');
      }

      // =========================================================================
      // STORY SECTION - Fade up from darkness
      // =========================================================================
      
      if (storySectionRef.current && storyContentRef.current) {
        const paragraphs = storyContentRef.current.querySelectorAll('p');
        
        gsap.set(storyContentRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.98,
        });

        gsap.set(paragraphs, { opacity: 0, y: 20 });

        // Optimize for mobile
        const storyScrub = isMobile ? 3 : 2;
        
        ScrollTrigger.create({
          trigger: storySectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: storyScrub, // Mobile-optimized
          onEnter: () => {
            gsap.to(storyContentRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              force3D: true, // GPU acceleration
            });

            gsap.to(paragraphs, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power2.out',
              force3D: true, // GPU acceleration
            });
          },
        });
      }



      // =========================================================================
      // THEMES SECTION - Staggered cards
      // =========================================================================
      
      if (themesSectionRef.current && themesContainerRef.current) {
        const themeCards = themesContainerRef.current.querySelectorAll('.theme-card');
        
        gsap.set(themeCards, { opacity: 0, y: 40, scale: 0.95 });

        // Optimize for mobile
        const themesScrub = isMobile ? 3 : 2;
        
        ScrollTrigger.create({
          trigger: themesSectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: themesScrub, // Mobile-optimized
          onEnter: () => {
            gsap.to(themeCards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              force3D: true, // GPU acceleration
            });
          },
        });

        // Hover effects
        themeCards.forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -5,
              scale: 1.02,
              boxShadow: '0 10px 40px -15px hsl(55 85% 60% / 0.3)',
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: 'none',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }

      // =========================================================================
      // WATCH SECTION - YouTube embed reveal
      // =========================================================================
      
      if (watchSectionRef.current && youtubeContainerRef.current) {
        gsap.set(youtubeContainerRef.current, { opacity: 0, y: 40, scale: 0.98 });

        // Optimize for mobile
        const watchScrub = isMobile ? 3 : 2;
        
        ScrollTrigger.create({
          trigger: watchSectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: watchScrub, // Mobile-optimized
          onEnter: () => {
            gsap.to(youtubeContainerRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              force3D: true, // GPU acceleration
            });
          },
        });
      }

      // =========================================================================
      // CREDITS SECTION - Film credit scroll
      // =========================================================================
      
      if (creditsRef.current) {
        const creditItems = creditsRef.current.querySelectorAll('.credit-item');
        
        gsap.set(creditItems, { opacity: 0, x: -30 });

        // Optimize for mobile
        const creditsScrub = isMobile ? 3 : 2;
        
        ScrollTrigger.create({
          trigger: creditsRef.current,
          start: 'top 85%',
          end: 'top 50%',
          scrub: creditsScrub, // Mobile-optimized
          onEnter: () => {
            gsap.to(creditItems, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.08,
              force3D: true, // GPU acceleration
              ease: 'power2.out',
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [film]);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ===================================================================== */}
      {/* BACK BUTTON - Fixed top left */}
      {/* ===================================================================== */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg text-white/80 hover:text-white hover:bg-black/60 hover:border-white/20 transition-all duration-300 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm font-medium">Terug</span>
      </Link>

      {/* ===================================================================== */}
      {/* HERO SECTION - Fullscreen pinned */}
      {/* ===================================================================== */}
      <section 
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Background image with parallax */}
        <div 
          ref={heroImageRef}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={film.heroImage || film.stills[0] || '/films/' + film.slug + '/hero.jpg'}
            alt={film.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center',
            }}
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        </div>

        {/* Hero content */}
        <div 
          ref={heroContentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-12"
        >
          <div className="text-center max-w-4xl mx-auto">
            {/* Film title */}
            <h1 
              ref={heroTitleRef}
              className="font-display text-5xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 px-4 text-center"
            >
              <span className="text-gradient-amber">{film.title}</span>
            </h1>

            {/* Short logline */}
            <p 
              ref={heroLoglineRef}
              className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
            >
              {film.shortLogline}
            </p>

            {/* Meta info */}
            <div 
              ref={heroMetaRef}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-white/60 uppercase tracking-wider font-mono mb-12 sm:mb-16 px-4"
            >
              <span>{film.year}</span>
              <span className="text-sam-amber/50">•</span>
              <span>{film.duration} min</span>
              <span className="text-sam-amber/50">•</span>
              <span>{film.themes.join(' / ')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* TRIGGER WARNING - Between hero and story */}
      {/* ===================================================================== */}
      {film.triggerWarning && (
        <section className="relative py-4 md:py-6 px-4 sm:px-6 md:px-12 flex items-center justify-center bg-black">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-white/70 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 mx-4">
              <AlertTriangle className="w-4 h-4 text-sam-amber flex-shrink-0" />
              <p className="leading-relaxed">
                {film.triggerWarning}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* STORY SECTION - Centered text block */}
      {/* ===================================================================== */}
      <section 
        ref={storySectionRef}
        className="relative pt-8 sm:pt-12 md:pt-16 pb-24 sm:pb-32 md:pb-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28 min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center"
      >
        <div 
          ref={storyContentRef}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-10 lg:p-12">
            {film.longSynopsis.split('\n\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 md:mb-7 text-center"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* STILLS GALLERY - Continuous looping marquee */}
      {/* ===================================================================== */}
      <FilmStillsMarquee stills={film.stills} />

      {/* ===================================================================== */}
      {/* THEMES SECTION */}
      {/* ===================================================================== */}
      <section 
        ref={themesSectionRef}
        className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 px-4">
            Waar dit verhaal <span className="text-gradient-amber">over gaat</span>
          </h2>
          
          <div 
            ref={themesContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {film.themes.map((theme, index) => {
              // Theme descriptions mapping
              const themeDescriptions: Record<string, string> = {
                'trauma': 'De diepe wonden die blijven, ook als de gebeurtenissen voorbij zijn. Trauma dat je vormt maar niet definieert.',
                'verlies': 'Het verlies van jezelf, van wie je was voordat iemand anders je identiteit overnam. Het verlies van vertrouwen en veiligheid.',
                'verwerking': 'De weg terug naar jezelf. Het proces van herkenning, acceptatie en het vinden van kracht om verder te gaan.',
                'grenzen': 'De moed om je eigen grenzen te stellen en te bewaken, zelfs wanneer anderen proberen ze te overschrijden.',
                'avond': 'Momenten van reflectie in de stilte van de nacht, wanneer gedachten het hardst klinken.',
                'reflectie': 'De ruimte om terug te kijken, te begrijpen wat er gebeurde en te beslissen wie je nu bent.',
                'eetstoornis': 'De complexe strijd met controle, zelfbeeld en de relatie met je lichaam. Een verhaal dat vaak onzichtbaar blijft.',
                'controle': 'De illusie van controle en de realiteit van controle verliezen. De strijd tussen wat je denkt te beheersen en wat jou beheerst.',
                'zelfbeeld': 'Hoe anderen je zien versus wie je werkelijk bent. De zoektocht naar jezelf in een wereld vol verwachtingen.',
              };

              return (
                <div
                  key={index}
                  className="theme-card p-4 sm:p-6 md:p-8 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-sam-amber/30 transition-colors duration-300"
                >
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-sam-amber capitalize">
                    {theme}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {themeDescriptions[theme.toLowerCase()] || 'Een thema dat de kern van dit verhaal raakt, onzichtbaar maar altijd aanwezig.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* WATCH SECTION - YouTube embed */}
      {/* ===================================================================== */}
      <section 
        ref={watchSectionRef}
        className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Bekijk de <span className="text-gradient-amber">film</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Neem de tijd, zorg voor jezelf tijdens en na het kijken.
            </p>
          </div>

          <div 
            ref={youtubeContainerRef}
            className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-white/20 shadow-2xl mx-2 sm:mx-0"
          >
            <iframe
              src={getYouTubeEmbedUrl(film.youtubeUrl)}
              title={film.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CREDITS SECTION */}
      {/* ===================================================================== */}
      <section 
        ref={creditsRef}
        className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 border-t border-white/10"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 md:mb-16 px-4">
            Credits
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            {film.crew.map((member, index) => (
              <div
                key={index}
                className="credit-item flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-3 sm:py-4 border-b border-white/5 px-4 sm:px-0"
              >
                <span className="font-medium text-white/90 text-base sm:text-lg">
                  {member.name}
                </span>
                <span className="text-white/60 text-xs sm:text-sm md:text-base uppercase tracking-wider font-mono">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* FOOTER */}
      {/* ===================================================================== */}
      <footer className="relative py-12 sm:py-16 border-t border-white/10 px-4 sm:px-6 md:px-12">
        <div className="container mx-auto text-center">
          <img 
            src="/sam-logo.png" 
            alt="SAM" 
            className="h-12 sm:h-14 w-auto mx-auto mb-4"
          />
          <p className="text-white/40 text-xs sm:text-sm">
            © {new Date().getFullYear()} SAM. Alle rechten voorbehouden.
          </p>
          <p className="text-white/30 text-xs mt-4">
            Powered by <span className="text-white/50">VETA-Media</span> en <span className="text-white/50">Haarlem studio</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SamFilmDetailPage;
