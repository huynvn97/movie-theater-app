import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

type ChipProps = {
  label: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export default function Chip({
  label,
  onPress,
  containerStyle,
  labelStyle,
}: ChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
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
  },
  label: {},
});
