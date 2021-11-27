import React from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between ml-10 mt-14">
      <section className="relative w-16 h-16 p-[2px] border rounded-full">
        <Image
          src={session?.user?.image || 'https://placeimg.com/100/100/any'}
          layout="fill"
          alt="Profile_Image"
          className="rounded-full "
        />
      </section>

      <section className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Nextagram</h3>
      </section>

      <section>
        <button
          onClick={() => {
            session ? signOut() : signIn();
          }}
          className="text-sm font-semibold text-blue-400"
        >
          {session ? 'Sign Out' : 'Sign In'}
        </button>
      </section>
    </div>
  );
}

export default MiniProfile;
