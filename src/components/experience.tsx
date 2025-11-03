'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import revealAnimation from '@/util/reveal';
import '@/styles/globals.scss';
import { ThemeContext } from '@/context/themeContext';
import { generateAccentColor } from '@/util/colorfulSetter';
import { experienceContent } from '@/data/experienceContent';

/**
 * Experience Component
 * Displays professional experience in a timeline format
 * Features staggered animations and dynamic theme-based colors
 * @param {boolean} isActive - Whether this component is currently visible/active
 */
const Experience: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const { theme } = useContext(ThemeContext);
  const experienceRefs = useRef<HTMLElement[]>([]);
  const accentColorsRef = useRef<string[]>([]);
  const [updateKey, setUpdateKey] = useState(0);

  /**
   * Update accent colors when theme changes
   * Generates new colors for Brilliant/luminous themes
   */
  useEffect(() => {
    const isColorful = theme === 'brilliant' || theme === 'luminous';
    
    // Reset and regenerate colors for each experience entry
    accentColorsRef.current = experienceContent.map(() => 
      isColorful ? generateAccentColor(theme) : 'var(--fg-contrast)'
    );
    
    // Force a re-render to apply new colors
    setUpdateKey(prev => prev + 1);
  }, [theme]);

  /**
   * Trigger staggered reveal animations when component becomes active
   * Each entry animates with a slight delay after the previous one
   */
  useEffect(() => {
    if (isActive) {
      let delay: number = 0;
      experienceRefs.current.forEach((element) => {
        revealAnimation(element, delay);
        delay += 0.1; // Stagger each animation by 0.1 seconds
      });
    }
  }, [isActive]);

  return (
    <section
      key={updateKey}
      id="experience-container"
      className="relative flex flex-col gap-4 w-full lg:w-kic-width h-full lg:pointer-events-none"
      aria-label="Experience Timeline"
    >
      {experienceContent.map((experience, index) => {
        const accentColor = accentColorsRef.current[index] || 'var(--fg-contrast)';
        
        return (
          <article 
            key={index}
            ref={(element) => {
              if (element instanceof HTMLElement) {
                experienceRefs.current[index] = element;
              }
            }} 
            className={`relative flex flex-col justify-between gap-2 w-full p-2 rounded-sm transition-colors duration-250 lg:pointer-events-auto ${theme === 'sombre' || theme === 'luminous' ? 'bg-itemCardBgDark hover:bg-itemCardBgHoverDark' : 'bg-itemCardBgLight hover:bg-itemCardBgHoverLight'}`}
          >
            {/* Header: Position and Timeline Dot */}
            <header className="w-full h-fit flex flex-row justify-between items-center">
              <h4 
                className="relative w-fit font-ibm-plex-sans text-base lg:text-lg text-fgContrast font-semibold selection:bg-fgContrast" 
                dangerouslySetInnerHTML={{ __html: experience.position }} 
                style={{ color: experience.period.includes('Present') ? accentColor : 'var(--fg-soft)' }}
              />
              <div 
                className="relative flex rounded-full w-2.5 h-2.5 lg:w-3 lg:h-3 bg-fgContrast" 
                style={{ backgroundColor: experience.period.includes('Present') ? accentColor : 'var(--fg-soft)' }}
                aria-hidden="true"
              />
            </header>
            
            {/* Footer: Company and Time Period */}
            <footer className="w-full h-fit flex flex-row justify-between items-end">
              <h5 
                className="text-fgSoft text-sm lg:text-base font-ibm-plex-sans font-medium" 
                dangerouslySetInnerHTML={{ __html: experience.company }}
                style={{ color: experience.period.includes('Present') ? accentColor : 'var(--fg-soft)' }}
              />
              <time 
                className="text-fgSoft text-xs lg:text-sm font-ibm-plex-mono font-semibold" 
                dangerouslySetInnerHTML={{ __html: experience.period }}
                style={{ color: experience.period.includes('Present') ? accentColor : 'var(--fg-soft)' }}
              />
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Experience;
