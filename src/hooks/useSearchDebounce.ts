import {useCallback, useEffect, useRef, useState} from 'react';

type Options = {
  searchFn: (query: string) => void;
  delay?: number;
};
export default function useSearchDebounce(options: Options) {
  const [searchText, setSearchText] = useState('');
  const timer = useRef<NodeJS.Timeout | null>(null);

  /**
   * Call after delay time when user stops typing.
   */
  const handleOnSearch = useCallback(
    (queryText: string) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        options.searchFn(queryText);
      }, options.delay || 250);
    },
    [options.searchFn, options.delay],
  );

  /**
   * When user types in the search bar, this function will be called.
   */
  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    handleOnSearch(searchText);
  }, [searchText]);

  return {
    onChangeText: onChangeText,
    searchText,
  };
}
