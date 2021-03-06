import {configureFilm, configureComment} from '../../adapter/adapter.js';
import {ActionCreator as FilmsActionCreator} from "../films/films.js";
import {extend} from "../../utils/common.js";

const initialState = {
  promoFilm: {},
  comments: [],
  loadPromoError: null,
  loadCommentsError: null,
  setFavoriteError: null,
};

const ActionType = {
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  SET_LOAD_PROMO_ERROR: `SET_LOAD_PROMO_ERROR`,
  SET_LOAD_COMMENTS_ERROR: `SET_LOAD_COMMENTS_ERROR`,
  SET_FAVORITE_ERROR: `SET_FAVORITE_ERROR`,
  UPDATE_FILMS: `UPDATE_FILMS`,
  UPDATE_PROMO: `UPDATE_PROMO`,
  DELETE_COMMENTS: `DELETE_COMMENTS`,
};

const ActionCreator = {
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
      dispatch(FilmsActionCreator.updateFilms(configureFilm(response.data)));
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
    case ActionType.LOAD_PROMO:
      return extend(state, {
        promoFilm: action.payload
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload
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
