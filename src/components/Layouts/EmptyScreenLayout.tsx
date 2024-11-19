import React from 'react';
import {PropsWithChildren} from 'react';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function EmptyScreenLayout(
  props: PropsWithChildren & {style?: StyleProp<ViewStyle>},
) {
  const {bottom} = useSafeAreaInsets();
  return (
    <ScrollView
      style={[styles.container, props.style]}
      contentContainerStyle={{paddingBottom: bottom}}>
      {props.children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#f8f9fa',
  },
});
