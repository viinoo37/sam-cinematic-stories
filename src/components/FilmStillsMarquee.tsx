import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FilmStillsMarqueeProps {
  stills: string[];
}

const FilmStillsMarquee = ({ stills }: FilmStillsMarqueeProps) => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Early return if no stills
  if (!stills || stills.length === 0) {
    return null;
  }

  // Helper: get exactly 8 stills per row (repeat if needed)
  const getRowStills = (startIndex: number, step: number): string[] => {
    const result: string[] = [];
    // Get by step pattern
    for (let i = startIndex; i < stills.length && result.length < 8; i += step) {
      result.push(stills[i]);
    }
    // Fill with remaining unique
    for (let i = 0; i < stills.length && result.length < 8; i++) {
      if (!result.includes(stills[i])) {
        result.push(stills[i]);
      }
    }
    // Repeat if still not 8
    while (result.length < 8 && result.length > 0) {
      const needed = 8 - result.length;
      result.push(...result.slice(0, Math.min(needed, result.length)));
    }
    return result.slice(0, 8);
  };

  const topRowStills = getRowStills(0, 2); // even indices
  const bottomRowStills = getRowStills(1, 2); // odd indices

  // Duplicate multiple times for seamless infinite loop
  // Multiple copies ensure there's always content visible during the loop
  const duplicatedTopStills = [...topRowStills, ...topRowStills, ...topRowStills];
  const duplicatedBottomStills = [...bottomRowStills, ...bottomRowStills, ...bottomRowStills];
  
  // Responsive block size calculation (can't use window in render, so using CSS classes)
  // Will be handled via Tailwind responsive classes

  useEffect(() => {
    if (!topRowRef.current || !bottomRowRef.current || !containerRef.current) return;

    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;
    const container = containerRef.current;
    
    let topTrigger: ScrollTrigger | null = null;
    let bottomTrigger: ScrollTrigger | null = null;

    // Wait for layout and images to load
    const initAnimation = () => {
        // Kill existing triggers if they exist
        if (topTrigger) topTrigger.kill();
        if (bottomTrigger) bottomTrigger.kill();
        
        // Force a reflow to ensure scrollWidth is calculated correctly
        void topRow.offsetWidth;
        void bottomRow.offsetWidth;
        
        // Wait a bit more for responsive classes to apply
        requestAnimationFrame(() => {
          // Recalculate after responsive classes have applied
          void topRow.offsetWidth;
          void bottomRow.offsetWidth;
          
          // Calculate the width of one complete set (8 stills)
          // We have 3 copies, so one set = total width / 3
          const topSetWidth = topRow.scrollWidth / 3;
          const bottomSetWidth = bottomRow.scrollWidth / 3;

          if (topSetWidth <= 0 || bottomSetWidth <= 0 || isNaN(topSetWidth) || isNaN(bottomSetWidth)) {
            // Retry if widths are not ready
            setTimeout(initAnimation, 100);
            return;
          }

          // Set initial position to 0 for both rows
          gsap.set(topRow, { x: 0 });
          gsap.set(bottomRow, { x: 0 });

          // Create ScrollTrigger that animates on scroll
          // Responsive scroll distance based on viewport
          const scrollDistance = window.innerWidth < 640 
            ? window.innerHeight * 4  // Mobile: shorter distance
            : window.innerWidth < 1024 
            ? window.innerHeight * 5  // Tablet: medium distance
            : window.innerHeight * 6; // Desktop: longer distance

          // Optimize rows for GPU acceleration
          gsap.set([topRow, bottomRow], { 
            willChange: 'transform',
            force3D: true,
          });

          // Mobile-optimized scrub value
          const scrubValue = window.innerWidth < 640 ? 4 : 2; // Higher scrub = smoother on mobile

          // Top row: moves right as you scroll
          topTrigger = ScrollTrigger.create({
            trigger: container,
            start: 'top bottom',
            end: `+=${scrollDistance}`,
            scrub: scrubValue, // Higher for mobile performance
            onUpdate: (self) => {
              const progress = self.progress;
              // Only move 0.3 of set width for subtle animation
              let topX = progress * topSetWidth * 0.3;
              
              // Wrap around seamlessly when we exceed one set width
              if (topX >= topSetWidth) {
                topX = topX % topSetWidth;
              }
              gsap.set(topRow, { x: topX, force3D: true });
            },
          });

          // Bottom row: moves left as you scroll
          bottomTrigger = ScrollTrigger.create({
            trigger: container,
            start: 'top bottom',
            end: `+=${scrollDistance}`,
            scrub: scrubValue, // Higher for mobile performance
            onUpdate: (self) => {
              const progress = self.progress;
              // Only move 0.3 of set width for subtle animation
              let bottomX = -progress * bottomSetWidth * 0.3;
              
              // Wrap around seamlessly when we exceed one set width (negative)
              if (bottomX <= -bottomSetWidth) {
                bottomX = bottomX % bottomSetWidth;
                // Ensure it stays negative
                if (bottomX > 0) {
                  bottomX = bottomX - bottomSetWidth;
                }
              }
              gsap.set(bottomRow, { x: bottomX, force3D: true });
            },
          });
        });
    };

    // Initialize with delay to ensure layout is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(initAnimation);
    }, 150);

    // Handle window resize - reinitialize animation with new sizes
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      
      if (topTrigger) topTrigger.kill();
      if (bottomTrigger) bottomTrigger.kill();
      
      if (topRowRef.current) {
        gsap.killTweensOf(topRowRef.current);
        gsap.set(topRowRef.current, { clearProps: 'x' });
      }
      if (bottomRowRef.current) {
        gsap.killTweensOf(bottomRowRef.current);
        gsap.set(bottomRowRef.current, { clearProps: 'x' });
      }
    };
  }, [stills]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden h-[240px] sm:h-[320px] md:h-[380px] lg:h-[450px]"
      style={{ 
        minHeight: '240px'
      }}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-10" />

      {/* Top row - moves left to right */}
      <div
        ref={topRowRef}
        className="absolute left-0 flex gap-2 md:gap-3 lg:gap-4"
        style={{ 
          willChange: 'transform',
          top: '8px',
        }}
      >
        {duplicatedTopStills.map((still, index) => (
          <div
            key={`top-${index}`}
            className="flex-shrink-0 relative w-[140px] h-[100px] sm:w-[180px] sm:h-[130px] lg:w-[240px] lg:h-[180px]"
          >
            <div
              className="w-full h-full rounded-lg overflow-hidden opacity-80"
              style={{
                backgroundImage: `url(${still})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Bottom row - moves right to left */}
      <div
        ref={bottomRowRef}
        className="absolute left-0 flex gap-2 md:gap-3 lg:gap-4"
        style={{ 
          willChange: 'transform',
          bottom: '8px',
        }}
      >
        {duplicatedBottomStills.map((still, index) => (
          <div
            key={`bottom-${index}`}
            className="flex-shrink-0 relative w-[140px] h-[100px] sm:w-[180px] sm:h-[130px] lg:w-[240px] lg:h-[180px]"
          >
            <div
              className="w-full h-full rounded-lg overflow-hidden opacity-80"
              style={{
                backgroundImage: `url(${still})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmStillsMarquee;
