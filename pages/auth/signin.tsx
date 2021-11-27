import React from 'react';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn as SignInToProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import Header from '../../components/Header';
import Image from 'next/image';

type signInProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};

function signIn({ providers }: signInProps) {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center -mt-28 px-14">
        <Image
          src="https://links.papareact.com/ocw"
          layout="fixed"
          width="320"
          height="100"
          alt="Login_Logo"
          priority
        />
        <p>This is not a Real App. It is built for educational purpose only 😊</p>

        <section className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 text-white bg-blue-500 rounded-lg"
                onClick={() => SignInToProvider(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default signIn;
