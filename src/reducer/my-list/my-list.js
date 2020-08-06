import {configureFilm} from '../../adapter/adapter.js';
import {extend} from "../../utils/common.js";

const initialState = {
  myFilms: [],
  loadStatus: false,
  myListError: null,
};

const ActionType = {
  LOAD_MY_LIST: `LOAD_MY_LIST`,
  START_LOADING_MY_LIST: `START_LOADING_MY_LIST`,
  END_LOADING_MY_LIST: `END_LOADING_MY_LIST`,
  SET_LOAD_MY_LIST_ERROR: `SET_LOAD_MY_LIST_ERROR`,
};

const ActionCreator = {
  loadMyList: (films) => {
    return ({
      type: ActionType.LOAD_MY_LIST,
      payload: films
    });
  },

  startLoadingMyList: () => {
    return ({
      type: ActionType.START_LOADING_MY_LIST,
    });
  },

  endLoadingMyList: () => {
    return ({
      type: ActionType.END_LOADING_MY_LIST,
    });
  },

  setError: (err) => {
    return {
      type: ActionType.SET_LOAD_MY_LIST_ERROR,
      payload: err,
    };
  },
};

const Operation = {
  loadMyList: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoadingMyList());
    return api.get(`/favorite`)
      .then((response) => {
        const configuredFilm = response.data.map((film) => configureFilm(film));

        dispatch(ActionCreator.endLoadingMyList());
        dispatch(ActionCreator.loadMyList(configuredFilm));
      })
      .catch((myListError) => {
        dispatch(ActionCreator.endLoadingMyList(false));
        dispatch(ActionCreator.setError(myListError.response.status));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MY_LIST:
      return extend(state, {
        myFilms: action.payload
      });

    case ActionType.START_LOADING_MY_LIST:
      return Object.assign(state, {
        loadStatus: true
      });

    case ActionType.END_LOADING_MY_LIST:
      return Object.assign(state, {
        loadStatus: false
      });

    case ActionType.SET_LOAD_MY_LIST_ERROR:

      return extend(state, {
        myListError: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
