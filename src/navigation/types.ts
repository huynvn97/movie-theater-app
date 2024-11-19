import {Movie, MovieActor} from 'movie-theater-sdk';

export type RootStackParamList = {
  Home: undefined;
  MovieDetail: {movie: Movie};
  MovieDetailAllActors: {actors: MovieActor[]};
};
