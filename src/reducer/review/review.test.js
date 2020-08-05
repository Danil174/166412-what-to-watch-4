/* eslint-disable camelcase */
import {reducer, ActionType, ActionCreator} from "./review.js";

describe(`reviewReducerTest`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      pending: false,
      error: null,
    });
  });

  it(`Reducer should start pending`, () => {
    expect(reducer({
      pending: false,
      error: null,
    }, {
      type: ActionType.START_PENDING,
    })).toEqual({
      pending: true,
      error: null,
    });
  });

  it(`Reducer should stop pending`, () => {
    expect(reducer({
      pending: true,
      error: null,
    }, {
      type: ActionType.END_PENDING,
    })).toEqual({
      pending: false,
      error: null,
    });
  });

  it(`Reducer should set review error`, () => {
    expect(reducer({
      pending: false,
      error: null,
    }, {
      type: ActionType.SET_REVIEW_ERROR,
      payload: 404,
    })).toEqual({
      pending: false,
      error: 404
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`startPending`, () => {
    expect(ActionCreator.startPending()).toEqual({
      type: ActionType.START_PENDING,
    });
  });

  it(`endPending`, () => {
    expect(ActionCreator.endPending()).toEqual({
      type: ActionType.END_PENDING,
    });
  });

  it(`setReviewError`, () => {
    expect(ActionCreator.setReviewError(404)).toEqual({
      type: ActionType.SET_REVIEW_ERROR,
      payload: 404
    });
  });
});
