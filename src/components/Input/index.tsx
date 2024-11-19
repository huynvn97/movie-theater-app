import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

type InputProps = TextInputProps & {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  loading?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
};

export default function Input(props: InputProps) {
  return (
    <View style={[styles.container, StyleSheet.flatten(props.containerStyle)]}>
      <View
        style={[
          styles.leftContainer,
          StyleSheet.flatten(props.leftContainerStyle),
        ]}>
        {props.leftElement}
      </View>
      <TextInput style={styles.input} {...props} />
      <View
        style={[
          styles.rightContainer,
          StyleSheet.flatten(props.rightContainerStyle),
        ]}>
        {props.loading && <ActivityIndicator />}
        {props.rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
  },
  leftContainer: {},
  rightContainer: {},
});
