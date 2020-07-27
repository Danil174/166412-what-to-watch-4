import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE, MovieTabs} from "../../const.js";

const initialState = {
  activeGenre: DEFAULT_GENRE,
  activeMovieTab: MovieTabs.OVERVIEW,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  CHANGE_MOVIE_TAB: `CHANGE_MOVIE_TAB`,
};

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),
  changeMovieTab: (tab) => ({
    type: ActionType.CHANGE_MOVIE_TAB,
    payload: tab,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:

      return extend(state, {
        activeGenre: action.payload,
      });
    case ActionType.CHANGE_MOVIE_TAB:

      return extend(state, {
        activeMovieTab: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
