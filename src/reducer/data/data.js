import configureFilm from '../../adapter/adapter.js';
import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE, MAX_GENRES_LENGTH} from "../../const.js";

const initialState = {
  films: [],
  promoFilm: {},
  genres: [],
  selectedFilmID: null,
  activeGenre: DEFAULT_GENRE,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  GET_GENRES: `GET_GENRES`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  GET_SELECT_FILM_ID: `GET_SELECT_FILM_ID`,
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

  getSelectedFilm: (id) => {
    return {
      type: ActionType.GET_SELECT_FILM_ID,
      payload: id,
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

    case ActionType.GET_SELECT_FILM_ID:

      return extend(state, {
        selectedFilmID: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
