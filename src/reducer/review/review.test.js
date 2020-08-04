/* eslint-disable camelcase */
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {reducer, ActionType, Operation, ActionCreator} from "./review.js";

const api = createAPI(() => {});

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

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onPost(`/comments/5`)
      .reply(200, []);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_PENDING,
          payload: [],
        });
      });
  });
});
