import {useLayoutEffect, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';

type Options = {
  itemsOnScreen: number;
};
export default function useListItemHeight(
  options: Options = {
    itemsOnScreen: 10,
  },
) {
  const [listHeight, setListHeight] = useState(Dimensions.get('window').height);
  const ref = useRef<View>(null);

  useLayoutEffect(() => {
    ref.current?.measure((x, y, width, height) => {
      if (height) {
        setListHeight(height / options.itemsOnScreen);
      }
    });
  }, [ref.current, options.itemsOnScreen]);

  return {listHeight, ref};
}
