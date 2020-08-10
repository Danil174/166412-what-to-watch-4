import {extend} from "../../utils/common.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const initialState = {
  pending: false,
  error: null,
};

const ActionType = {
  START_PENDING: `START_PENDING`,
  END_PENDING: `END_PENDING`,
  SET_REVIEW_ERROR: `SET_REVIEW_ERROR`,
};

const ActionCreator = {
  startPending: () => {
    return ({
      type: ActionType.START_PENDING,
    });
  },

  endPending: () => {
    return ({
      type: ActionType.END_PENDING,
    });
  },

  setReviewError: (err) => {
    return {
      type: ActionType.SET_REVIEW_ERROR,
      payload: err,
    };
  },
};

const Operation = {
  postComment: (id, data) => (dispatch, getState, api) => {
    dispatch(ActionCreator.startPending());
    return api.post(`/comments/${id}`, {
      rating: data.rating,
      comment: data.comment,
    })
    .then(() => {
      dispatch(ActionCreator.endPending());
      history.push(`${AppRoute.MOVIE_PAGE}/${id}`);
    })
    .catch((error) => {
      dispatch(ActionCreator.endPending());
      dispatch(ActionCreator.setReviewError(error.response.status));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.START_PENDING:
      return extend(state, {
        pending: true
      });
    case ActionType.END_PENDING:
      return extend(state, {
        pending: false
      });
    case ActionType.SET_REVIEW_ERROR:
      return extend(state, {
        error: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
