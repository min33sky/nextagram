import React from 'react';
import Image from 'next/image';
import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex justify-between max-w-6xl mx-2 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden w-24 cursor-pointer lg:inline-grid">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            alt="logo"
            objectFit="contain"
            loading="lazy"
          />
        </div>

        <div className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
            alt="Logo-small"
            priority
          />
        </div>

        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative p-3 mt-1">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full pl-10 border-gray-300 rounded-md focus:border-black focus:ring-black bg-gray-50 sm:text-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-6 cursor-pointer md:hidden" />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="rotate-45 navBtn" />
            <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 animate-pulse">
              3
            </div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />

          {/* 프로필 아이콘 */}
          <div className="relative w-10 h-10 transition-all duration-150 ease-out hover:scale-125">
            <Image
              src="https://w.namu.la/s/aa62bb55ff504ce4c4f858973e05fb37c29fe1c8e8064e62136016a251fdade09d46957a3ced9f0cb8e4897605713cc2a61731e8e3410b998f963d86c7ec874095038ff82de257eb240e7f774f1cc0e850afb76905cb223118d738dededc0fb1b17610cc7ede649a1d0c60bf77c6bce0"
              layout="fill"
              className="rounded-full cursor-pointer "
              alt="profile_image"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
