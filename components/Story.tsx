import React from 'react';
import Image from 'next/image';

interface IStory {
  img: string;
  username: string;
}

function Story({ img, username }: IStory) {
  return (
    <div>
      <div className="relative p-[1.5px] rounded-full ring-1 ring-red-500">
        <div className="relative rounded-full ring-1 ring-blue-700 w-14 h-14">
          <Image
            src="https://placeimg.com/100/100/any"
            // src={img}
            alt="Story_Image"
            className="rounded-full cursor-pointer"
            layout="fill"
            loading="lazy"
            blurDataURL="https://placeimg.com/100/100/any"
            placeholder="blur"
          />
        </div>
      </div>
      <p className="text-xs font-semibold text-center truncate w-14">{username}</p>
    </div>
  );
}

export default Story;
