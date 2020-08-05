import NameSpace from "../name-space.js";

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};

export const getloadFilmsError = (state) => {
  return state[NameSpace.DATA].loadFilmsError;
};

export const getloadPromoError = (state) => {
  return state[NameSpace.DATA].loadPromoError;
};

export const getLoadPromoError = (state) => {
  return state[NameSpace.DATA].loadCommentsError;
};

