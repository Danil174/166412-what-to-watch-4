
import NameSpace from "../name-space.js";

export const getActiveGenre = (state) => {
  return state[NameSpace.APP_STATE].activeGenre;
};
