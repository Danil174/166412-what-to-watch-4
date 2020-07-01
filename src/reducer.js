import mockFilms from "./mocks/films.js";
import {extend} from "./utils/common.js";

const initialState = {
  activeGenre: `All genres`,
  films: mockFilms
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
};

const getFilmsByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre);
};

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),

  getFilmsByGenre: (films, genre) => {
    if (genre === `All genres`) {
      return {
        type: ActionType.GET_FILMS_BY_GENRE,
        payload: initialState.films,
      };
    }

    const filteredFilms = getFilmsByGenre(films, genre);

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filteredFilms,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:

      return extend(state, {
        activeGenre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:

      return extend(state, {
        films: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
