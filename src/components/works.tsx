'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import revealAnimation from '@/util/reveal';
import '@/styles/globals.scss';
import { ThemeContext } from '@/context/themeContext';
import { worksContent } from '@/data/worksContent';
import { generateAccentColor } from '@/util/colorfulSetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

/**
 * Works Component
 * Displays portfolio projects with links, descriptions, and tech stacks
 * Features staggered animations and dynamic theme-based colors
 * @param {boolean} isActive - Whether this component is currently visible/active
 */
const Works: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const { theme } = useContext(ThemeContext);
  const worksRefs = useRef<HTMLDivElement[]>([]);
  const accentColorsRef = useRef<string[][]>([]);
  const [updateKey, setUpdateKey] = useState(0);

  /**
   * Update accent colors when theme changes
   * Generates new colors for each technology in each project
   */
  useEffect(() => {
    const isColorful = theme === 'brilliant' || theme === 'luminous';
    
    // Generate colors for each project's tech stack
    accentColorsRef.current = worksContent.map(work => 
      work.technologies.map(() => 
        isColorful ? generateAccentColor(theme) : 'var(--fg-contrast)'
      )
    );
    
    setUpdateKey(prev => prev + 1);
  }, [theme]);

  /**
   * Trigger staggered reveal animations when component becomes active
   */
  useEffect(() => {
    if (isActive) {
      let delay: number = 0;
      worksRefs.current.forEach((element) => {
        revealAnimation(element, delay);
        delay += 0.1; // Stagger each animation by 0.1 seconds
      });
    }
  }, [isActive]);

  return (
    <section
      key={updateKey}
      id="works-container"
      className="relative flex flex-col gap-4 w-full lg:w-kic-width h-fit pb-8 lg:pointer-events-none"
      role="region" 
      aria-label="Works and Projects"
    >
      {worksContent.map((work, index) => (
        <div 
          key={index} 
          ref={(element) => {
            if (element) {
              worksRefs.current[index] = element;
            }
          }} 
          className={`relative flex flex-col justify-between gap-2 w-full p-2 rounded-sm transition-colors duration-250 lg:pointer-events-auto ${theme === 'sombre' || theme === 'luminous' ? 'bg-itemCardBgDark hover:bg-itemCardBgHoverDark' : 'bg-itemCardBgLight hover:bg-itemCardBgHoverLight'}`}
          role="article"
          aria-labelledby={`project-title-${index}`}
        >
          {/* WIP Overlay */}
          <div className={`${work.wip ? '' : 'hidden'} absolute flex inset-0 w-full h-full box-border z-50 bg-black/50 items-center justify-center overflow-clip`}>
            <h4 className="absolute w-[110%] h-fit py-1 text-center text-lg font-bold text-bg bg-fgContrast -rotate-6" aria-label="Work in Progress">WORK IN PROGRESS</h4>
          </div>
          
          {/* Project Title and Links */}
          <div className="w-full h-fit flex flex-row gap-4 justify-between items-start md:items-center">
            <Link 
              href={work.githubURL}
              data-umami-event="Project Click"
              data-umami-event-name={work.project}
              data-umami-event-type="github-title"
              passHref 
              target="_blank" 
              rel="noopener noreferrer"
              title={`View ${work.project} source code on GitHub`}
              aria-label={`View ${work.project} source code on GitHub`}
            >
              <h4 id={`project-title-${index}`} className="relative w-fit font-ibm-plex-sans text-base lg:text-lg text-fgHard font-semibold selection:bg-fgHard hover:text-fgContrast hover:selection:bg-fgContrast transition-colors duration-250">
                {work.project}
              </h4>
            </Link>
            
            {/* External Links */}
            <div className="relative flex flex-row gap-4" role="group" aria-label="Project links">
              {work.projectURL && (
                <Link 
                  href={work.projectURL}
                  data-umami-event="Project Click"
                  data-umami-event-name={work.project}
                  data-umami-event-type="external-icon"
                  passHref 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Visit the project page for ${work.project}`}
                >
                  <FontAwesomeIcon icon={faUpRightFromSquare} className="text-fgHard text-lg hover:text-fgContrast transition-colors duration-250" aria-hidden="true" />
                </Link>
              )}
              <Link 
                href={work.githubURL}
                data-umami-event="Project Click"
                data-umami-event-name={work.project}
                data-umami-event-type="github-icon"
                passHref 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View source code for ${work.project} on GitHub`}
              >
                <FontAwesomeIcon icon={faGithub} className="text-fgHard text-lg hover:text-fgContrast transition-colors duration-250" aria-hidden="true" />
              </Link>
            </div>
          </div>
          
          {/* Project Description */}
          <p 
            className="text-fgSoft text-sm lg:text-base font-ibm-plex-sans font-light" 
            dangerouslySetInnerHTML={{ __html: work.description }}
            role="contentinfo"
            aria-label={`${work.project} description`}
          />

          {/* Technology Stack */}
          <div 
            className="flex flex-wrap gap-2 mt-2"
            role="list"
            aria-label={`Technologies used in ${work.project}`}
          >
            {work.technologies.map((tech, techIndex) => {
              const color = work.wip 
                ? 'var(--fg-soft)' 
                : (accentColorsRef.current[index]?.[techIndex] || 'var(--fg-contrast)');

              return (
                <h6 
                  key={techIndex} 
                  className="text-[0.65rem] font-bold text-bg px-2 py-1 rounded-sm cursor-default transition duration-250 hover:opacity-85 selection:bg-bg selection:text-fgContrast"
                  style={{ backgroundColor: color }}
                >
                  {tech}
                </h6>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Works;
