import mockFilms from "../../mocks/films.js";
import configureFilm from '../../adapter/adapter.js';
import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE} from "../../const.js";

const genres = Array.from(new Set(mockFilms.map((film) => film.genre)));
genres.unshift(DEFAULT_GENRE);

const initialState = {
  films: [],
  promoFilms: {},
  genres: [],
  selectedFilm: null,
  activeGenre: DEFAULT_GENRE,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
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

export {reducer, ActionType, ActionCreator, genres, getFilmsByGenre, Operation};
