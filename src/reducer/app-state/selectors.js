
import NameSpace from "../name-space.js";

export const getSelectedFilmID = (state) => {
  return state[NameSpace.APP_STATE].selectedFilmID;
};

export const getActiveGenre = (state) => {
  return state[NameSpace.APP_STATE].activeGenre;
};
