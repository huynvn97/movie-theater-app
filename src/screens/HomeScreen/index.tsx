import React, {useCallback} from 'react';
import {View, StyleSheet, TextInput, FlatList, Text} from 'react-native';
import {Movie, useGetMovies, useSearchMovies} from 'movie-theater-sdk';
import useListItemHeight from '../../hooks/useListItemHeight';
import useSearchDebounce from '../../hooks/useSearchDebounce';

export default function HomeScreen() {
  const {movies, loading} = useGetMovies();
  const {
    runSearchMovie,
    searchData,
    loading: searchLoading,
  } = useSearchMovies();
  const {searchText, onChangeText} = useSearchDebounce({
    searchFn: () => {
      runSearchMovie(searchText);
    },
  });
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
        value={searchText}
        onChangeText={text => onChangeText(text)}
      />
      <View style={{flex: 1}} ref={ref}>
        <FlatList
          data={searchData?.length ? searchData : movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
