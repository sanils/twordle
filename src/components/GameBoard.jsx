import { HStack, VStack } from '@chakra-ui/react';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import Keyboard from './Keyboard';
import Wordle from './Wordle';

// https://usehooks.com/useEventListener/
function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      const eventListener = (event) => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      // eslint-disable-next-line consistent-return
      return () => element.removeEventListener(eventName, eventListener);
    },
    [eventName, element],
  );
}

export default function GameBoard() {
  const [currentGuessWord, setCurrentGuessWord] = useState('');
  const [targetWords, setTargetWords] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);

  useEffect(() => {
    setCurrentGuessWord('a');
    setTargetWords(['other', 'beers', 'print', 'treat', 'cabal', 'unite', 'threw', 'color', 'regal', 'click', 'milky', 'fever', 'cable', 'stray', 'stuff', 'fives']);
    // setGuessedWords(['ghoul', 'minty', 'bears', 'throe', 'other']);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Usecallback just means that if currentGuessWord & guessedWords haven't changed,
  // don't re-run the func
  const handler = useCallback(
    ({ key, keyCode }) => {
      if (keyCode === 8) {
        if (currentGuessWord.length > 0) {
          setCurrentGuessWord(currentGuessWord.slice(0, -1));
        }
      } else if (keyCode === 13) {
        setGuessedWords([...guessedWords, currentGuessWord]);
        setCurrentGuessWord('');
      } else if (currentGuessWord.length < 5) {
        if (keyCode >= 65 && keyCode <= 90) {
          setCurrentGuessWord(currentGuessWord + key);
        }
      }
    },
    [currentGuessWord, guessedWords],
  );

  // Listen for keypresses
  useEventListener('keydown', handler);

  return (
    <VStack>
      <VStack>
        <HStack>
          {targetWords.slice(0, 8).map((targetWord, i) => (
            <Wordle
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              currentGuessWord={currentGuessWord}
              guessedWords={guessedWords}
              targetWord={targetWord}
            />
          ))}
        </HStack>
        <HStack>
          {targetWords.slice(8, 16).map((targetWord, i) => (
            <Wordle
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              currentGuessWord={currentGuessWord}
              guessedWords={guessedWords}
              targetWord={targetWord}
            />
          ))}
        </HStack>
      </VStack>
      <Keyboard />
    </VStack>
  );
}
