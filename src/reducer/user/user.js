import {configureUserData} from '../../adapter/adapter.js';
import {AuthorizationStatus} from "../../const.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userData: {},
  loginError: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_DATA: `SET_USER_DATA`,
  SET_LOGIN_ERROR: `SET_LOGIN_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setUserData: (data) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: data,
    };
  },
  setLoginError: (error) => {
    return {
      type: ActionType.SET_LOGIN_ERROR,
      payload: error,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_USER_DATA:
      return Object.assign({}, state, {
        userData: action.payload,
      });
    case ActionType.SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(configureUserData(response.data)));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
          dispatch(ActionCreator.setUserData({}));
        }
        throw error;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setUserData(configureUserData(response.data)));
      dispatch(ActionCreator.setLoginError(false));
    })
    .catch(() => {
      dispatch(ActionCreator.setLoginError(true));
    });
  },
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
