import React from 'react';
import Image from 'next/image';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';

interface IPost {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

/**
 * POST Component
 * @param param0
 * @returns
 */
function Post({ id, username, img, caption, userImg }: IPost) {
  return (
    <div className="bg-white border rounded-sm shadow-md my-7">
      {/* Header */}
      <section className="flex items-center p-5">
        <div className="p-1 mr-3 rounded-full ring-1 ring-gray-500">
          <div className="relative w-12 h-12">
            <Image src={userImg} layout="fill" className="rounded-full" alt="User_Image" />
          </div>
        </div>
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </section>

      {/* Img */}
      <section className="">
        <Image
          src={img}
          layout="responsive"
          width="200"
          height="200"
          objectFit="cover"
          alt="Post_Image"
        />
      </section>

      {/* Buttons */}
      <section className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="postBtn" />
          <ChatIcon className="postBtn" />
          <PaperAirplaneIcon className="postBtn" />
        </div>
        <BookmarkIcon className="postBtn" />
      </section>

      {/* Caption */}
      <p className="p-5 truncate">
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>

      {/* Comments */}
      <section>
        <p>댓글창</p>
      </section>

      {/* Input BOx */}
      <section>
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-5" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      </section>
    </div>
  );
}

export default Post;
