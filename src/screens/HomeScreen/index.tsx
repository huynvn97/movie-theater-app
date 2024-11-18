import React, {useCallback, useState} from 'react';
import {View, StyleSheet, TextInput, FlatList, Text} from 'react-native';
import {Movie, useGetMovies} from 'movie-theater-sdk';
import useListItemHeight from '../../hooks/useListItemHeight';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const {movies} = useGetMovies();

  const {listHeight, ref} = useListItemHeight();

  const renderItem = useCallback(
    ({item}: {item: Movie}) => {
      return (
        <View style={[styles.item, {height: listHeight}]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.channelTitle} numberOfLines={2}>
            {item.overview}
          </Text>
        </View>
      );
    },
    [listHeight],
  );

  return (
    <View style={[styles.container]}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <View style={{flex: 1}} ref={ref}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          initialNumToRender={10}
          windowSize={21}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  channelTitle: {},
});
