import NameSpace from "../name-space.js";

export const getMyList = (state) => {
  return state[NameSpace.MY_LIST].myFilms;
};
export const getLoadingStatus = (state) => {
  return state[NameSpace.MY_LIST].loadStatus;
};

export const getMyListError = (state) => {
  return state[NameSpace.MY_LIST].myListError;
};
