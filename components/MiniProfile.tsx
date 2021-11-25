import React from 'react';
import Image from 'next/image';

function MiniProfile() {
  return (
    <div className="flex items-center justify-between ml-10 mt-14">
      <section className="relative w-16 h-16 p-[2px] border rounded-full">
        <Image
          src="https://w.namu.la/s/aa62bb55ff504ce4c4f858973e05fb37c29fe1c8e8064e62136016a251fdade09d46957a3ced9f0cb8e4897605713cc2a61731e8e3410b998f963d86c7ec874095038ff82de257eb240e7f774f1cc0e850afb76905cb223118d738dededc0fb1b17610cc7ede649a1d0c60bf77c6bce0"
          layout="fill"
          alt="Profile_Image"
          className="rounded-full "
        />
      </section>

      <section className="flex-1 mx-4">
        <h2 className="font-bold">Kayrl</h2>
        <h3 className="text-sm text-gray-400">Welcome to Nextagram</h3>
      </section>

      <section>
        <button className="text-sm font-semibold text-blue-400">Sign Out</button>
      </section>
    </div>
  );
}

export default MiniProfile;
