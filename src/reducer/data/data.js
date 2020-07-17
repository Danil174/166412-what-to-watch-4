import mockFilms from "../../mocks/films.js";
import {extend} from "../../utils/common.js";

const defaultGenre = `All genres`;
const genres = Array.from(new Set(mockFilms.map((film) => film.genre)));
genres.unshift(defaultGenre);

const initialState = {
  films: mockFilms,
  selectedFilm: null,
  activeGenre: defaultGenre,
  genres
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  GET_SELECT_FILM: `GET_SELECT_FILM`,
};

const getFilmsByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre);
};

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),

  getFilmsByGenre: (genre) => {
    if (genre === defaultGenre) {
      return {
        type: ActionType.GET_FILMS_BY_GENRE,
        payload: initialState.films,
      };
    }

    const filteredFilms = getFilmsByGenre(initialState.films, genre);

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filteredFilms,
    };
  },

  getSelectedFilm: (id) => {
    const index = initialState.films.findIndex((film) => film.id === id);
    const selectedFilm = initialState.films[index];
    return {
      type: ActionType.GET_SELECT_FILM,
      payload: selectedFilm,
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

    case ActionType.GET_SELECT_FILM:

      return extend(state, {
        selectedFilm: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, defaultGenre, genres, getFilmsByGenre};
