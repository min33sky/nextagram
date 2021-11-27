import React, { useEffect, useState } from 'react';
import faker from 'faker';
import Story from './Story';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

type SuggestionsType = {
  name: string;
  username: string;
  avatar: string;
  email: string;
  dob: Date;
  phone: string;
  address: Faker.Address;
  website: string;
  company: Faker.Company;
  id: number;
}[];

//? 아바타 생성에 필요한 Seed
const DUMMY_AVATAR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'];

/**
 * Stories
 * @returns
 */
function Stories() {
  const [suggestions, setSuggestions] = useState<SuggestionsType>([]);

  useEffect(() => {
    let fakerMembers = [...Array(20)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));

    setSuggestions(fakerMembers);
  }, []);

  return (
    <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-sm shadow-md scrollbar-thin scrollbar-thumb-gray-700">
      {suggestions.map(({ id, username }, idx) => (
        <Story key={id} img={DUMMY_AVATAR[idx]} username={username} />
      ))}
    </div>
  );
}

export default Stories;
