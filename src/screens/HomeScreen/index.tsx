import React, {useCallback, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList, Text, RefreshControl} from 'react-native';
import {Movie, useGetMovies, useSearchMovies} from 'movie-theater-sdk';
import useListItemHeight from '../../hooks/useListItemHeight';
import useSearchDebounce from '../../hooks/useSearchDebounce';
import MovieCard from '../../components/MovieCard';
import Input from '../../components/Input';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';

const ITEM_BOTTOM_SPACE = 8;
export default function HomeScreen() {
  // TODO: Handle load more and refresh list movies

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {movies, loading, runFetchMovies} = useGetMovies();
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
          onPress={() => navigation.navigate('MovieDetail', {movie: item})}
        />
      );
    },
    [listItemHeight, navigation],
  );

  const onRefreshList = () => {
    if (searchText) {
      runSearchMovie(searchText);
    } else {
      runFetchMovies();
    }
  };

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
          data={searchText ? searchData : movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefreshList} />
          }
          ListEmptyComponent={<Text>No data...</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
});
