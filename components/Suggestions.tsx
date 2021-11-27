import React, { useEffect, useState } from 'react';
import faker from 'faker';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

type SuggestionType = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
  dob: Date;
  phone: string;
  address: Faker.Address;
  website: string;
  company: Faker.Company;
}[];

//? 아바타 생성에 필요한 Seed
const DUMMY_AVATAR = ['AAAA AA', 'BBB BBBB', 'CCCC CCC', 'DDDD DD', 'AAAA QQ'];

function Suggestions() {
  const [suggestions, setSuggestions] = useState<SuggestionType>([]);

  useEffect(() => {
    const dummySuggestions = [...Array(5)].map((_, idx) => ({
      ...faker.helpers.contextualCard(),
      id: idx,
    }));

    setSuggestions(dummySuggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <section className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </section>

      <section>
        {suggestions.map((suggestion, idx) => {
          const svg1 = createAvatar(style, {
            seed: DUMMY_AVATAR[idx],
          });
          return (
            <div key={suggestion.id} className="flex items-center justify-between mt-3">
              {/* Avatar */}
              <div className="w-14 h-14 " dangerouslySetInnerHTML={{ __html: svg1 }} />

              <div className="flex-1 ml-4">
                <h2 className="text-sm font-semibold">{suggestion.username}</h2>
                <h3 className="text-xs text-gray-400">Works at {suggestion.company.name}</h3>
              </div>

              <button className="text-sm text-blue-400">Follow</button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Suggestions;
