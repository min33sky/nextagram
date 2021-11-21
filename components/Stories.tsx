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
 *
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
    <div>
      {suggestions.map((suggestion, idx) => (
        <Story key={suggestion.id} img={suggestion.avatar} username={suggestion.username} />
      ))}
    </div>
  );
}

export default Stories;
