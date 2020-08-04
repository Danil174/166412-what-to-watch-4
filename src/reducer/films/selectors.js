import {getActiveGenre} from "../app-state/selectors.js";
import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE} from "../../const.js";


export const getFilms = (state) => {
  return state[NameSpace.FILMS].films;
};

export const getGenres = (state) => {
  return state[NameSpace.FILMS].genres;
};

export const getLoadingStatus = (state) => {
  return state[NameSpace.FILMS].loading;
};

export const getFilmsError = (state) => {
  return state[NameSpace.FILMS].loadingFilmError;
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
      const index = state[NameSpace.FILMS].films.findIndex((film) => film.id === +id);

      return state[NameSpace.FILMS].films[index];
    },
    (film) => film
);

