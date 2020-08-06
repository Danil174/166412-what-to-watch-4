import {configureFilm} from '../../adapter/adapter.js';
import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE, MAX_GENRES_LENGTH} from "../../const.js";

const initialState = {
  films: [],
  genres: [],
  loading: false,
  loadingFilmError: null,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  GET_GENRES: `GET_GENRES`,
  START_LOADING: `START_LOADING`,
  END_LOADING: `END_LOADING`,
  SET_LOAD_FILMS_ERROR: `SET_LOAD_FILMS_ERROR`,
  UPDATE_FILMS: `UPDATE_FILMS`,
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

  startLoading: () => {
    return ({
      type: ActionType.START_LOADING,
    });
  },

  endLoading: () => {
    return ({
      type: ActionType.END_LOADING,
    });
  },

  setError: (err) => {
    return {
      type: ActionType.SET_LOAD_FILMS_ERROR,
      payload: err,
    };
  },

  updateFilms: (film) => {
    return {
      type: ActionType.UPDATE_FILMS,
      payload: film,
    };
  },
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    return api.get(`/films`)
      .then((response) => {
        const configuredFilm = response.data.map((film) => configureFilm(film));

        const genresList = [
          DEFAULT_GENRE,
          ...new Set(configuredFilm.map((film) => film.genre).slice(0, MAX_GENRES_LENGTH))
        ];

        dispatch(ActionCreator.endLoading());
        dispatch(ActionCreator.getGenres(genresList));
        dispatch(ActionCreator.loadFilms(configuredFilm));
      })
      .catch((error) => {
        dispatch(ActionCreator.endLoading());
        dispatch(ActionCreator.setError(error.response.status));
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

    case ActionType.START_LOADING:
      return Object.assign(state, {
        loading: true
      });

    case ActionType.END_LOADING:
      return Object.assign(state, {
        loading: false
      });

    case ActionType.SET_LOAD_FILMS_ERROR:

      return extend(state, {
        loadingFilmError: action.payload,
      });

    case ActionType.UPDATE_FILMS:
      const newFilm = action.payload;
      const oldFilms = state.films;
      const index = oldFilms.findIndex((film) => film.id === newFilm.id);
      const newFilms = [].concat(oldFilms.slice(0, index), newFilm, oldFilms.slice(index + 1));
      return extend(state, {
        films: newFilms,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
