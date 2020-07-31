import {getActiveGenre} from "../app-state/selectors.js";
import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE} from "../../const.js";


export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
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
