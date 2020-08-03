import {getActiveGenre} from "../app-state/selectors.js";
import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE} from "../../const.js";


export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export const getLoadingStatus = (state) => {
  return state[NameSpace.DATA].loading;
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getGenres = (state) => {
  return state[NameSpace.DATA].genres;
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

export const getFilmsByGenre = createSelector(
    getFilms,
    getActiveGenre,
    (films, genre) => {
      if (genre === DEFAULT_GENRE) {
        return films;
      }
      return films.filter((film) => film.genre === genre);
    }
);

export const getFilmByID = createSelector(
    (id, state) => {
      const index = state[NameSpace.DATA].films.findIndex((film) => film.id === +id);

      if (index === -1) {
        return index;
      }

      return state[NameSpace.DATA].films[index];
    },
    (film) => film
);

