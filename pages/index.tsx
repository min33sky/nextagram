import type { NextPage } from 'next';
import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Home: NextPage = () => {
  return (
    <div className="h-screen bg-gray-50 scrollbar-thin">
      <Head>
        <title>Nextagram</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />
      {/* 모달 */}
      <Modal />
    </div>
  );
};

export default Home;
