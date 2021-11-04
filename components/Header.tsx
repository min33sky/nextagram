import React from 'react';
import Image from 'next/image';

function Header() {
  return (
    <header>
      <div className="flex justify-between max-w-6xl">
        {/* Left */}
        <div className="relative hidden w-24 h-24 cursor-pointer lg:inline-grid">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            alt="logo"
            objectFit="contain"
          />
        </div>

        <div className="relative flex-shrink-0 w-10 h-10 cursor-pointer lg:hidden">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
            alt="Logo-small"
          />
        </div>

        {/* Middle */}
        {/* Right */}
      </div>
    </header>
  );
}

export default Header;
