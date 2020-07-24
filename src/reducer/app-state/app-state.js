import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE} from "../../const.js";

const initialState = {
  selectedFilmID: null,
  activeGenre: DEFAULT_GENRE,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_SELECT_FILM_ID: `GET_SELECT_FILM_ID`,
};

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),

  getSelectedFilm: (id) => {
    return {
      type: ActionType.GET_SELECT_FILM_ID,
      payload: id,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:

      return extend(state, {
        activeGenre: action.payload,
      });

    case ActionType.GET_SELECT_FILM_ID:

      return extend(state, {
        selectedFilmID: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
