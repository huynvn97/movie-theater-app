import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import SectionActors from '@screens/MovieDetail/sections/SectionActors';
import {MovieActor} from 'movie-theater-sdk';
import {StyleSheet} from 'react-native';
import EmptyScreenLayout from '@components/Layouts/EmptyScreenLayout';

export default function MovieDetailAllActorsScreen() {
  const {
    params: {actors},
  } = useRoute<RouteProp<{params: {actors: MovieActor[]}}>>();

  return (
    <EmptyScreenLayout style={[styles.container]}>
      <SectionActors actors={actors} showFull />
    </EmptyScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
});
