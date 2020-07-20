import mockFilms from "../../mocks/films.js";
import configureFilm from '../../adapter/adapter.js';
import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE, MAX_GENRES_LENGTH} from "../../const.js";

const initialState = {
  films: [],
  promoFilm: {},
  genres: [],
  selectedFilm: null,
  activeGenre: DEFAULT_GENRE,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  GET_GENRES: `GET_GENRES`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  GET_SELECT_FILM: `GET_SELECT_FILM`,
};

const getFilmsByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre);
};

const ActionCreator = {
  loadFilms: (films) => {
    return ({
      type: ActionType.LOAD_FILMS,
      payload: films
    });
  },

  getGenres: (genres) => {
    return ({
      type: ActionType.GET_GENRES,
      payload: genres
    });
  },

  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),

  getFilmsByGenre: (genre) => {
    if (genre === DEFAULT_GENRE) {
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

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const configuredFilm = response.data.map((film) => configureFilm(film));

        const genresList = [
          DEFAULT_GENRE,
          ...new Set(configuredFilm.map((film) => film.genre).slice(0, MAX_GENRES_LENGTH))
        ];

        dispatch(ActionCreator.getGenres(genresList));
        dispatch(ActionCreator.loadFilms(configuredFilm));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload
      });

    case ActionType.GET_GENRES:
      return extend(state, {
        genres: action.payload,
      });

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

export {reducer, ActionType, ActionCreator, getFilmsByGenre, Operation};
