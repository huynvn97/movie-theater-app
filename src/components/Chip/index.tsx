import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {getImageUrl} from '@utils/image';

type ChipProps = {
  label: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  leftIconUrl?: string;
};

export default function Chip({
  label,
  onPress,
  containerStyle,
  labelStyle,
  leftIconUrl,
}: ChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      {leftIconUrl && (
        <Image source={{uri: getImageUrl(leftIconUrl)}} style={[styles.icon]} />
      )}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    fontSize: 14,
    color: '#444',
    marginRight: 8,

    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {},
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
});
