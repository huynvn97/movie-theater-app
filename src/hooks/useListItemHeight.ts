import {useLayoutEffect, useRef, useState} from 'react';
import {View} from 'react-native';

type Options = {
  itemsOnScreen: number;
  distractHeight: number; // * Height of other components that affect the list height, because the wrapper of list mostly use flex: 1, lead to the list height is not correct on first calculation
};

/**
 * * Handle return height of each item should show on screen
 * * Make sure the screen will show itemsOnScreen: number on screens
 * @param options
 * @param options.itemsOnScreen - Number of items should show on screen
 * @param options.distractHeight - Height of other components that affect the list height
 * @returns { listItemHeight }
 */
export default function useListItemHeight(
  options: Options = {
    itemsOnScreen: 10,
    distractHeight: 0,
  },
) {
  const [listItemHeight, setListItemHeight] = useState(0);
  const containerRef = useRef<View>(null);

  // * useLayoutEffect to make sure the screen will show itemsOnScreen: number on screens at first render
  useLayoutEffect(() => {
    containerRef.current?.measure((x, y, width, height) => {
      if (height) {
        setListItemHeight(
          (height - options.distractHeight) / options.itemsOnScreen,
        );
      }
    });
  }, [containerRef.current, options.itemsOnScreen]);

  return {listItemHeight, containerRef};
}
