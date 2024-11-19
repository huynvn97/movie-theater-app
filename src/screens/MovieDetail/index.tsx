import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Movie,
  useMovieActors,
  useMovieKeywords,
  useMovieReviews,
} from 'movie-theater-sdk';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {getImageUrl} from '../../utils/image';
import SectionKeywords from './sections/SectionKeywords';
import SectionActors from './sections/SectionActors';
import SectionReviews from './sections/SectionReviews';
import EmptyScreenLayout from '../../components/Layouts/EmptyScreenLayout';

export default function MovieDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: {movie: Movie}}>>();
  const {movie} = route.params;
  const {data: reviews, loading: reviewLoading} = useMovieReviews({
    id: movie.id,
  });
  const {data: keywords, loading: keywordLoading} = useMovieKeywords({
    id: movie.id,
  });
  const {data: actors, loading: actorLoading} = useMovieActors({id: movie.id});

  useEffect(() => {
    navigation.setOptions({title: movie.title});
  }, [movie.title, navigation]);

  return (
    <EmptyScreenLayout style={[styles.container]}>
      {/* Movie Poster */}
      <Image
        source={{uri: getImageUrl(movie.poster_path)}}
        style={styles.poster}
      />
      {/* Movie Title */}
      <Text style={styles.title}>{movie.title}</Text>

      {/* Movie Description */}
      <Text style={styles.description}>{movie.overview}</Text>

      {/* Movie Actors */}
      <SectionActors actors={actors} loading={actorLoading} />

      {/* Movie Reviews */}
      <SectionReviews reviews={reviews} loading={reviewLoading} />

      {/* Movie Keywords */}
      <SectionKeywords keywords={keywords} loading={keywordLoading} />
    </EmptyScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {paddingTop: 20},
  poster: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
});
