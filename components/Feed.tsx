import React from 'react';
import Stories from './Stories';

/**
 * Nextagram Feed
 * @returns
 */
function Feed() {
  return (
    <main className="grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl">
      {/* Section */}
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
      </section>

      {/* Secrion - xl 이상의 화면일때만 보여지는 부분*/}
      <section>
        {/* Mini Profile */}
        {/* Suggestions */}
      </section>
    </main>
  );
}

export default Feed;
