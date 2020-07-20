import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE} from "../../const.js";


export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export const getSelectedFilmID = (state) => {
  return state[NameSpace.DATA].selectedFilmID;
};

export const getActiveGenre = (state) => {
  return state[NameSpace.DATA].activeGenre;
};

export const getGenres = (state) => {
  return state[NameSpace.DATA].genres;
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
