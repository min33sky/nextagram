import React from 'react';
import Image from 'next/image';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

interface IStory {
  img: string;
  username: string;
}

function Story({ img, username }: IStory) {
  const svg1 = createAvatar(style, {
    seed: img,
  });

  return (
    <div>
      {/* Avatar */}
      <div
        className="w-12 h-12 p-[1.5px] rounded-full ring-1 ring-gray-400 hover:scale-105 transition-all duration-150 ease-out cursor-pointer "
        dangerouslySetInnerHTML={{ __html: svg1 }}
      />
      <p className="text-xs font-semibold text-center truncate w-14">{username}</p>
    </div>
  );
}

export default Story;
