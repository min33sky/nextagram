import React from 'react';
import Image from 'next/image';

interface IStory {
  img: string;
  username: string;
}

function Story({ img, username }: IStory) {
  return (
    <>
      <div className="relative w-20 h-20">
        <Image src={img} alt="Story_Image" layout="fill" />
      </div>
      <p>{username}</p>
    </>
  );
}

export default Story;
