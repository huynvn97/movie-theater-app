import React, {useCallback, useLayoutEffect} from 'react';
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

  const inputWrapperRef = React.useRef<View>(null);
  const [inputHeight, setInputHeight] = React.useState(0);
  useLayoutEffect(() => {
    inputWrapperRef.current?.measure((x, y, width, height) => {
      setInputHeight(height);
    });
  }, []);

  const {listItemHeight, containerRef} = useListItemHeight({
    distractHeight: inputHeight + styles.container.padding * 2,
    itemsOnScreen: 10,
  });
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
      <View ref={inputWrapperRef}>
        <Input
          leftElement={<Text>Search:</Text>}
          placeholder="Enter movie name or #keywords..."
          value={searchText}
          onChangeText={text => onChangeText(text)}
          loading={searchLoading}
          autoComplete="off"
          autoCorrect={false}
          containerStyle={{marginBottom: 10}}
        />
      </View>

      <View ref={containerRef} style={{flex: 1}}>
        <FlatList
          data={searchData?.length ? searchData : movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
