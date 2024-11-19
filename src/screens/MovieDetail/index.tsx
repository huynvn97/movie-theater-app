import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {Movie} from 'movie-theater-sdk';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {getImageUrl} from '../../utils/image';

export default function MovieDetailScreen() {
  const route = useRoute<RouteProp<{params: {movie: Movie}}>>();
  const {movie} = route.params;

  return (
    <ScrollView>
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

      {/* Movie Reviews */}

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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
