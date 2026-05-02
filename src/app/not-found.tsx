'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col relative w-full h-full items-center justify-center text-fgHard pointer-events-none [&_*]:pointer-events-auto">
  
      <div className="relative flex w-11/12 h-fit lg:max-w-screen-sm mb-4 items-center text-md lg:text-2xl text-fgSoft text-center">
        <h1 className="flex-1">Me when I visit
          <Link href="https://kicanter.dev" className="text-fgHard hover:text-fgContrast selection:text-bg selection:bg-fgHard transition-colors hover:selection:bg-fgContrast duration-250"> kicanter.dev</Link>
        </h1>
        <h1 className="flex-1">Me when page not found</h1>
      </div>

      <Image src="/images/deannorris.jpg" width={640} height={418} alt="404" className="w-11/12 h-auto lg:max-w-screen-sm" />

    </div>
  );
} 
