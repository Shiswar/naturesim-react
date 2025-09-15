// hooks/useWordService.ts
import { useState, useEffect, useCallback } from 'react';

interface WordServiceState {
  words: Set<string> | null;
  isLoading: boolean;
  error: string | null;
}

interface WordServiceReturn {
  isReal: (word: string) => boolean;
  isLoading: boolean;
  error: string | null;
  getWordCount: () => number;
  getRandomWord: () => string | null;
}

export const useWordService = (): WordServiceReturn => {
  const [state, setState] = useState<WordServiceState>({
    words: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadWords = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Option A: Dynamic import
        const wordData = await import('./english_words.json');
        const wordsArray = wordData.words as string[];
        
        const wordsSet = new Set(wordsArray.map(word => word.toLowerCase()));
        
        setState({
          words: wordsSet,
          isLoading: false,
          error: null
        });
      } catch (err) {
        setState({
          words: null,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load words'
        });
      }
    };

    loadWords();
  }, []);

  const isReal = useCallback((word: string): boolean => {
    if (!state.words) return false;
    return state.words.has(word.toLowerCase());
  }, [state.words]);

  const getWordCount = useCallback((): number => {
    return state.words?.size || 0;
  }, [state.words]);

  const getRandomWord = useCallback((): string | null => {
    if (!state.words || state.words.size === 0) return null;
    const wordsArray = Array.from(state.words);
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
  }, [state.words]);

  return {
    isReal,
    isLoading: state.isLoading,
    error: state.error,
    getWordCount,
    getRandomWord
  };
};
