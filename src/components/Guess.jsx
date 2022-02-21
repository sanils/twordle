import React from 'react';
import { HStack } from '@chakra-ui/react';
import Letter from './Letter';

export default function Guess({ letters, colours }) {
  return (
    <HStack>
      {letters.map((l, i) => (
        <Letter
        // eslint-disable-next-line react/no-array-index-key
          key={i}
          char={l}
          colour={colours[i]}
        />
      ))}
    </HStack>
  );
}
