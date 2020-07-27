import {reducer, ActionType, ActionCreator} from "./app-state.js";
import {DEFAULT_GENRE, MovieTabs} from "../../const.js";

describe(`app-state reducer test`, () => {
  it(`Reducer without additional parameters should return initial stat`, () => {
    expect(reducer(void 0, {})).toEqual({
      activeGenre: DEFAULT_GENRE,
      activeMovieTab: MovieTabs[0],
    });
  });

  it(`Reducer should change genre filter`, () => {
    expect(reducer({
      activeGenre: DEFAULT_GENRE,
      activeMovieTab: MovieTabs[0],
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Dramas`,
    })).toEqual({
      activeGenre: `Dramas`,
      activeMovieTab: MovieTabs[0],
    });

    expect(reducer({
      activeGenre: `Dramas`,
      activeMovieTab: MovieTabs[0],
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Kids & Family`,
    })).toEqual({
      activeGenre: `Kids & Family`,
      activeMovieTab: MovieTabs[0],
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
