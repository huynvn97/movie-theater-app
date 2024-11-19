import React, {useCallback} from 'react';
import {View, StyleSheet, TextInput, FlatList, Text} from 'react-native';
import {Movie, useGetMovies, useSearchMovies} from 'movie-theater-sdk';
import useListItemHeight from '../../hooks/useListItemHeight';
import useSearchDebounce from '../../hooks/useSearchDebounce';
import MovieCard from '../../components/MovieCard';
import Input from '../../components/Input';

const ITEM_BOTTOM_SPACE = 8;

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

  const {listItemHeight, containerRef} = useListItemHeight();

  const renderItem = useCallback(
    ({item}: {item: Movie}) => {
      return (
        <MovieCard
          item={item}
          containerStyle={{
            height: listItemHeight - ITEM_BOTTOM_SPACE,
            marginBottom: ITEM_BOTTOM_SPACE,
          }}
        />
      );
    },
    [listItemHeight],
  );

  return (
    <View style={[styles.container]}>
      <Input
        leftElement={<Text>Search:</Text>}
        placeholder="Enter movie name or #keywords..."
        value={searchText}
        onChangeText={text => onChangeText(text)}
        loading={searchLoading}
        autoComplete='off'
        autoCorrect={false}
      />

      <View ref={containerRef} style={{flex: 1}}>
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
});
