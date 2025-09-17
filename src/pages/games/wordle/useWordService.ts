// hooks/useWordService.ts
import { useState, useEffect, useCallback } from 'react';
import { getRandom, searchDictionary } from './wordService';

interface WordServiceState {
  word: string | null;
  isLoading: boolean;
  error: string | null;
}

interface WordServiceReturn {
  isReal: (word: string) => Promise<boolean>;
  solution: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useWordService = (gamesPlayed: number): WordServiceReturn => {
  const [state, setState] = useState<WordServiceState>({
    word: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const getSolutionWord = async () => {
      try {
        setLoading();

        // Option A: Dynamic import
        // const wordData = await import('./english_words.json');
        // const wordsArray = wordData.words as string[];

        const word = await getRandomWord(5, 1);

        setState((prev) => ({
          ...prev,
          word: word?.toUpperCase() ?? null,
          error: null
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          word: null,
          error: err instanceof Error ? err.message : 'Failed to load words'
        }));
      }
      finally {
        setFinishedLoading()
      }
    };

    getSolutionWord();
  }, [gamesPlayed]);

  const isReal = useCallback(async (word: string): Promise<boolean> => {
    setLoading();

    const realOrNot = await searchDictionary(word);

    setFinishedLoading();

    if (!realOrNot.success) { return false; }
    return true;
  }, []);

  const setLoading = () => {
    setState((prev) => ({
      ...prev,
      isLoading: true
    }));
  }

  const setFinishedLoading = () => {
    setState((prev) => ({
      ...prev,
      isLoading: false
    }));
  }


  const getRandomWord = useCallback(async (wordLength: number, limit: number): Promise<string | null> => {
    const word = await getRandom(wordLength, limit);
    return word;
  }, []);



  return {
    isReal,
    solution: state.word,
    isLoading: state.isLoading,
    error: state.error
  };
};
