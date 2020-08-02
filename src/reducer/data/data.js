import {configureFilm, configureComment} from '../../adapter/adapter.js';
import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE, MAX_GENRES_LENGTH} from "../../const.js";

const initialState = {
  films: [],
  promoFilm: {},
  genres: [],
  comments: [],
  loadFilmsError: null,
  loadPromoError: null,
  loadCommentsError: null,
  setFavoriteError: null,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  GET_GENRES: `GET_GENRES`,
  SET_LOAD_FILMS_ERROR: `SET_LOAD_FILMS_ERROR`,
  SET_LOAD_PROMO_ERROR: `SET_LOAD_PROMO_ERROR`,
  SET_LOAD_COMMENTS_ERROR: `SET_LOAD_COMMENTS_ERROR`,
  SET_FAVORITE: `SET_FAVORITE`,
  SET_FAVORITE_ERROR: `SET_FAVORITE_ERROR`,
  UPDATE_FILMS: `UPDATE_FILMS`,
  UPDATE_PROMO: `UPDATE_PROMO`,
  DELETE_COMMENTS: `DELETE_COMMENTS`,
};

const ActionCreator = {
  loadFilms: (films) => {
    return ({
      type: ActionType.LOAD_FILMS,
      payload: films
    });
  },

  loadPromo: (film) => {
    return ({
      type: ActionType.LOAD_PROMO,
      payload: film
    });
  },

  loadComments: (comments) => {
    return ({
      type: ActionType.LOAD_COMMENTS,
      payload: comments
    });
  },

  getGenres: (genres) => {
    return ({
      type: ActionType.GET_GENRES,
      payload: genres
    });
  },

  setLoadFilmsError: (err) => {
    return {
      type: ActionType.SET_LOAD_FILMS_ERROR,
      payload: err,
    };
  },

  setLoadPromoError: (err) => {
    return {
      type: ActionType.SET_LOAD_PROMO_ERROR,
      payload: err,
    };
  },

  setLoadCommentsError: (err) => {
    return {
      type: ActionType.SET_LOAD_COMMENTS_ERROR,
      payload: err,
    };
  },

  setFavoriteError: (err) => {
    return {
      type: ActionType.SET_FAVORITE_ERROR,
      payload: err,
    };
  },

  updateFilms: (film) => {
    return {
      type: ActionType.UPDATE_FILMS,
      payload: film,
    };
  },

  updatePromo: (film) => {
    return {
      type: ActionType.UPDATE_PROMO,
      payload: film,
    };
  },

  deleteComments: () => {
    return {
      type: ActionType.DELETE_COMMENTS,
      payload: null
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
      })
      .catch((error) => {
        dispatch(ActionCreator.setLoadFilmsError(error.response.status));
      });
  },
  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(configureFilm(response.data)));
      })
      .catch((error) => {
        dispatch(ActionCreator.setLoadFilmsError(error.response.status));
      });
  },
  setFavorite: (filmId, favorite) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/${favorite}`)
    .then((response) => {
      dispatch(ActionCreator.updateFilms(configureFilm(response.data)));
      dispatch(ActionCreator.updatePromo(configureFilm(response.data)));
    })
    .catch((error) => {
      dispatch(ActionCreator.setFavoriteError(error.response.status));
    });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const configuredComments = response.data.map((comment) => configureComment(comment));
        dispatch(ActionCreator.loadComments(configuredComments));
      })
      .catch((error) => {
        dispatch(ActionCreator.setLoadCommentsError(error.response.status));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        promoFilm: action.payload
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload
      });

    case ActionType.GET_GENRES:
      return extend(state, {
        genres: action.payload,
      });

    case ActionType.SET_LOAD_FILMS_ERROR:

      return extend(state, {
        loadFilmsError: action.payload,
      });

    case ActionType.SET_LOAD_PROMO_ERROR:

      return extend(state, {
        loadPromoError: action.payload,
      });

    case ActionType.SET_FAVORITE_ERROR:
      return extend(state, {
        setFavoriteError: action.payload,
      });

    case ActionType.SET_LOAD_COMMENTS_ERROR:
      return extend(state, {
        loadCommentsError: action.payload
      });

    case ActionType.UPDATE_FILMS:
      const newFilm = action.payload;
      const oldFilms = state.films;
      const index = oldFilms.findIndex((film) => film.id === newFilm.id);
      const newFilms = [].concat(oldFilms.slice(0, index), newFilm, oldFilms.slice(index + 1));
      return extend(state, {
        films: newFilms,
      });

    case ActionType.UPDATE_PROMO:
      let newPromo = state.promoFilm;
      if (newPromo.id === action.payload.id) {
        newPromo = action.payload;
      }
      return extend(state, {
        promoFilm: newPromo,
      });

    case ActionType.DELETE_COMMENTS:
      return extend(state, {
        comments: [],
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
