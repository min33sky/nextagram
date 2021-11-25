import React, { useEffect, useState } from 'react';
import faker from 'faker';
import Story from './Story';

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
      {suggestions.map(({ id, avatar, username }) => (
        <Story key={id} img={avatar} username={username} />
      ))}
    </div>
  );
}

export default Stories;
