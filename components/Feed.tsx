import { useSession } from 'next-auth/react';
import React from 'react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

/**
 * Nextagram Feed
 * @returns
 */
function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl ${
        !session && '!grid-cols-1 !max-w-3xl '
      } `}
    >
      {/* Section */}
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {/* Secrion - xl 이상의 화면일때만 보여지는 부분*/}
      <section className="hidden xl:inline-grid md:col-span-1">
        {session && (
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions />
          </div>
        )}
      </section>
    </main>
  );
}

export default Feed;
