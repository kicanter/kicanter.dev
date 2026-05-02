import React from 'react';
import Link from 'next/link';

/**
 * Footer Component
 * Displays source code link
 * Features dynamic year update
 */
const Footer = () => {
  return (
    <Link 
      href="https://github.com/kicanter/kicanter.dev"
      data-umami-event="Footer Click"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source code on GitHub, made with passion by Kieran Canter"
    >
      <p className="group text-center font-ibm-plex-serif text-fgHard text-[10px] font-medium hover:text-fgContrast hover:selection:bg-fgContrast transition-colors duration-250">
        with passion by <span className="font-spectral-sc font-semibold group-hover:selection:bg-fgContrast" aria-label="Kieran Canter">
          Kieran CANTER
        </span>
      </p>
    </Link>
  );
};

export default Footer;
