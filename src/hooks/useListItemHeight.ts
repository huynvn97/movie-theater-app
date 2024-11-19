import {useLayoutEffect, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';

type Options = {
  itemsOnScreen: number;
};

/**
 * * Handle return height of each item should show on screen
 * * Make sure the screen will show itemsOnScreen: number on screens
 * @param options
 * @returns { listItemHeight }
 */
export default function useListItemHeight(
  options: Options = {
    itemsOnScreen: 10,
  },
) {
  const [listItemHeight, setListItemHeight] = useState(
    Dimensions.get('window').height,
  );
  const containerRef = useRef<View>(null);

  useLayoutEffect(() => {
    containerRef.current?.measure((x, y, width, height) => {
      if (height) {
        setListItemHeight(height / options.itemsOnScreen);
      }
    });
  }, [containerRef.current, options.itemsOnScreen]);

  return {listItemHeight, containerRef};
}
