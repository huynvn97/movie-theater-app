import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {Movie, MovieReview, useMovieReviews} from 'movie-theater-sdk';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getImageUrl} from '../../utils/image';

export default function MovieDetailScreen() {
  const route = useRoute<RouteProp<{params: {movie: Movie}}>>();
  const {movie} = route.params;
  const {data: reviews, loading: reviewLoading} = useMovieReviews({id: movie.id});
  console.log(movie.id);
  return (
    <ScrollView style={[styles.container]}>
      {/* Movie Poster */}
      <Image
        source={{uri: getImageUrl(movie.poster_path)}}
        style={styles.poster}
      />
      {/* Movie Title */}
      <Text style={styles.title}>{movie.title}</Text>
      {/* Movie Description */}
      <Text style={styles.description}>{movie.overview}</Text>
      {/* Movie Reviews */}
      <Text style={styles.sectionTitle}>Reviews</Text>
      <FlatList
        horizontal
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: MovieReview}) => {
          return (
            <View style={styles.review}>
              <Text style={styles.reviewer}>{item.author}</Text>
              <Text style={styles.rating}>
                Rating: {item.author_details.rating}
              </Text>
              <Text style={styles.comment} numberOfLines={3}>
                {item.content}
              </Text>
            </View>
          );
        }}
      />

      {/* Movie Keywords */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginVertical: 8,
  },
  actor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  review: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: Dimensions.get('window').width / 1.5,
    marginRight: 10,
  },
  reviewer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  keyword: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    fontSize: 14,
    color: '#444',
    marginRight: 8,
  },
});
