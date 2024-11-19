import {RouteProp, useRoute} from '@react-navigation/native';
import SectionActors from '../MovieDetail/sections/SectionActors';
import {MovieActor} from 'movie-theater-sdk';
import {StyleSheet, View} from 'react-native';

export default function MovieDetailAllActorsScreen() {
  const {
    params: {actors},
  } = useRoute<RouteProp<{params: {actors: MovieActor[]}}>>();

  return (
    <View style={[styles.container]}>
      <SectionActors actors={actors} showFull />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
});
