import React from 'react';
import Post from './Post';

const DUMMY_DATA = [
  {
    id: '123',
    username: 'min33sky',
    userImg:
      'https://w.namu.la/s/0ee6c08ac2b5290a2190f440d0902b0ec83a9b1c19753b422e2a3725119b8322acd6bb6fcfe1437835bd126a05470e89ca27cb6fdc4c557b6ade5818c96c2d896add394302624567f58468bfece0f0e089bfcf4d44b3f24e03530dcd3fdb36a7',
    img: 'https://w.namu.la/s/83b3618fdb9cacab4788efe12c7fc00c49b07587f08f4a2d26397da817a16b91541e79fe4e8f3a3a83408b14934362772c8db7591b8dd1540d0b8dbd47f3cec93f22502779e4178ac29e49c58f6e33952941489795b481b25e7c01276aa9605b',
    caption: 'yoshi! grando season~',
  },
  {
    id: '124',
    username: 'chim',
    userImg:
      'https://w.namu.la/s/5d868e9c3a55c9552f0058d7a3f0fb5e1f1b59e4756b549a8b7fa742beff4372cf74f9847a5bffc7fd16c10908f0514034aa602c69a11d20986de4bd4511c03f39e86334322f1654664193b61a1fd3e863a9874be7baababe69653547cea3b65',
    img: 'https://w.namu.la/s/5d868e9c3a55c9552f0058d7a3f0fb5e1f1b59e4756b549a8b7fa742beff4372cf74f9847a5bffc7fd16c10908f0514034aa602c69a11d20986de4bd4511c03f39e86334322f1654664193b61a1fd3e863a9874be7baababe69653547cea3b65',
    caption: 'yoshi! grando season~',
  },
];

function Posts() {
  return (
    <div>
      {DUMMY_DATA.map(({ id, username, userImg, img, caption }) => (
        <Post key={id} id={id} username={username} userImg={userImg} img={img} caption={caption} />
      ))}
    </div>
  );
}

export default Posts;
