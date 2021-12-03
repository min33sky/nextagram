import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { Fragment, MutableRefObject, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { db, storage } from '../firebase';
import { modalState } from '../store/modalAtom';

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const filePickerRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const captionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [loading, setLoading] = useState(false);

  const uploadPost = async () => {
    if (loading) return;
    if (!selectedFile) return;
    setLoading(true);

    //* 1) Create a post and add to firestore 'posts' collection
    //* 2) Get the Post ID for the newly created post
    //* 3) Upload the image to firebase storage with the Post ID
    //* 4) Get a download URL from firebase storage and update the original post with image

    //* Firestore의 'posts' 콜렉션에 게시물을 추가한다.
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session?.user?.name,
      caption: captionRef.current?.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    //* 방금 저장한 DB의 Document ID값을 이용하여 Storage에 저장할 주소를 설정한다.
    const imageRef = await ref(storage, `posts/${docRef.id}/image`);

    //* 이미지를 Storage에
    await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL,
      });
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const onClickFileUpload = (e: React.MouseEvent) => {
    filePickerRef.current?.click();
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (event) => {
      setSelectedFile(event.target?.result as string);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease0in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:Scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedFile}
                    className="object-contain w-full cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                    alt=""
                  />
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer">
                    <CameraIcon
                      onClick={onClickFileUpload}
                      className="w-6 h-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900" as="h3">
                      Upload a photo
                    </Dialog.Title>
                  </div>

                  <div>
                    <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full text-center border-none focus:ring-0"
                      placeholder="Please enter a caption..."
                      ref={captionRef}
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                    disabled={!selectedFile}
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
