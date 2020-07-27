import {reducer, ActionType, ActionCreator} from "./app-state.js";
import {DEFAULT_GENRE} from "../../const.js";

describe(`app-state reducer test`, () => {
  it(`Reducer without additional parameters should return initial stat`, () => {
    expect(reducer(void 0, {})).toEqual({
      activeGenre: DEFAULT_GENRE,
    });
  });

  it(`Reducer should change genre filter`, () => {
    expect(reducer({
      activeGenre: DEFAULT_GENRE,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Dramas`,
    })).toEqual({
      activeGenre: `Dramas`,
    });

    expect(reducer({
      activeGenre: `Dramas`,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Kids & Family`,
    })).toEqual({
      activeGenre: `Kids & Family`,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changeFilter`, () => {
    expect(ActionCreator.changeFilter(`Documentary`)).toEqual({
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Documentary`,
    });
  });
});
