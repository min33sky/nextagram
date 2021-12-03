import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';

interface IPost {
  id: string; //* 게시물의 ID
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
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]); // 댓글 리스트
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]); //? 게시물에 좋아요를 누른 사람들의 아이디
  const [hasLiked, setHasLiked] = useState(false);

  // console.log('아 이 디 : ', id);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          // console.log('게시물 목록 가져오기: ', snapshot.docs);
          setComments(snapshot.docs);
        }
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [id]
  );

  //? 내가 좋아요를 누른 게시물인지 확인
  useEffect(() => {
    const idx = likes.findIndex((like) => like.id === session?.uid);
    setHasLiked(idx !== -1);
  }, [likes, session?.uid]);

  const likePost = useCallback(async () => {
    if (session?.uid) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session.uid), {
          username: session?.user?.name,
        });
      }
    }
  }, [hasLiked, id, session]);

  const handleCommentInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }, []);

  const sendComment = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!comment || !comment.trim()) return;

      if (session) {
        await addDoc(collection(db, 'posts', id, 'comments'), {
          comment: comment,
          username: session.user?.name,
          userImage: session.user?.image,
          timestamp: serverTimestamp(),
        });
        // 초기화
        setComment('');
      }
    },
    [comment, id, session]
  );

  //? Next의 Image 컴포넌트에서 src가 비어있을 때 에러 방지
  if (!img)
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );

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
          blurDataURL={img}
          placeholder="blur"
          loading="lazy"
        />
      </section>

      {/* Buttons */}
      {session && (
        <section className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon
              onClick={likePost}
              className={`postBtn ${hasLiked && 'fill-current text-red-500'}`}
            />
            <ChatIcon className="postBtn" />
            <PaperAirplaneIcon className="postBtn" />
          </div>
          <BookmarkIcon className="postBtn" />
        </section>
      )}

      {/* Caption */}
      <div className="p-5 truncate">
        {likes.length > 0 && <p className="mb-1 -mt-4 font-bold">{likes.length} likes</p>}
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </div>

      {/* Comments */}
      <section>
        {comments.length > 0 && (
          <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-gray-700 scrollbar-thin">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-center mb-3 space-x-2">
                <Image
                  className="rounded-full"
                  src={comment.data().userImage}
                  width="28"
                  height="28"
                  alt="user_avatar"
                />
                <p className="flex-1 text-sm ">
                  <span className="mr-3 font-bold">{comment.data().username}</span>
                  {comment.data().comment}
                </p>

                <Moment fromNow className="pr-5 text-xs">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Input BOx */}
      {session && (
        <section>
          <form onSubmit={sendComment} className="flex items-center p-4">
            <EmojiHappyIcon className="h-5" />
            <input
              type="text"
              value={comment}
              onChange={handleCommentInput}
              placeholder="Add a comment..."
              className="flex-1 border-none outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="font-semibold text-blue-400"
            >
              Post
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default Post;
