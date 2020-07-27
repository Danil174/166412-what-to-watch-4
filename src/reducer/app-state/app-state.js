import {extend} from "../../utils/common.js";
import {DEFAULT_GENRE} from "../../const.js";

const initialState = {
  activeGenre: DEFAULT_GENRE,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
};

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: filter,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:

      return extend(state, {
        activeGenre: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
