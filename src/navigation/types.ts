import {Movie} from 'movie-theater-sdk';

export type RootStackParamList = {
  Home: undefined;
  MovieDetail: {movie: Movie};
};
