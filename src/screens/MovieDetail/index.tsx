import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Movie,
  MovieActor,
  MovieReview,
  useMovieActors,
  useMovieKeywords,
  useMovieReviews,
} from 'movie-theater-sdk';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getImageUrl} from '../../utils/image';
import Chip from '../../components/Chip';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
  const {data: keywords} = useMovieKeywords({id: movie.id});
  const {data: actors} = useMovieActors({id: movie.id});

  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({title: movie.title});
  }, [movie.title]);

  // TODO: Handle load more and refresh movie's reviews
  // TODO: handle error state
  // TODO: Add a loading state

  return (
    <EmptyScreenLayout>
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
      <SectionActors actors={actors} />

      {/* Movie Reviews */}
      <SectionReviews reviews={reviews} />

      {/* Movie Keywords */}
      <SectionKeywords keywords={keywords} />
    </EmptyScreenLayout>
  );
}

const styles = StyleSheet.create({
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
