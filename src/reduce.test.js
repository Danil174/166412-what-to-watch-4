import {reducer, ActionCreator, ActionType, defaultGenre, genres, getFilmsByGenre} from "./reducer.js";
import mockFilms from "./mocks/films.js";
import mainFilm from "./mocks/film.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    films: mockFilms,
    film: mainFilm,
    activeGenre: defaultGenre,
    genres
  });
});

it(`Reducer should change genre filter`, () => {
  expect(reducer({
    films: mockFilms,
    film: mainFilm,
    activeGenre: `Documentary`,
    genres
  }, {
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: `Dramas`,
  })).toEqual({
    films: mockFilms,
    film: mainFilm,
    activeGenre: `Dramas`,
    genres
  });

  expect(reducer({
    films: mockFilms,
    film: mainFilm,
    activeGenre: `Dramas`,
    genres
  }, {
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: `Kids & Family`,
  })).toEqual({
    films: mockFilms,
    film: mainFilm,
    activeGenre: `Kids & Family`,
    genres
  });
});

it(`Reducer should return filtered films`, () => {
  expect(reducer({
    films: mockFilms,
    film: mainFilm,
    activeGenre: defaultGenre,
    genres
  }, {
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: getFilmsByGenre(mockFilms, `Romance`),
  })).toEqual({
    films: getFilmsByGenre(mockFilms, `Romance`),
    film: mainFilm,
    activeGenre: defaultGenre,
    genres
  });

  expect(reducer({
    films: getFilmsByGenre(mockFilms, `Romance`),
    film: mainFilm,
    activeGenre: `Dramas`,
    genres
  }, {
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: mockFilms,
  })).toEqual({
    films: mockFilms,
    film: mainFilm,
    activeGenre: `Dramas`,
    genres
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changeFilter`, () => {
    expect(ActionCreator.changeFilter(`Documentary`)).toEqual({
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Documentary`,
    });
  });

  it(`Action creator for getFilmsByGenre returns films filtered by genre`, () => {
    expect(ActionCreator.getFilmsByGenre(`Crime`)).toEqual({
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: [{
        id: 2,
        genre: `Crime`,
        title: `Bohemian Rhapsody`,
        src: `img/bohemian-rhapsody.jpg`,
        source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
      {
        id: 16,
        genre: `Crime`,
        title: `Snatch`,
        src: `img/snatch.jpg`,
        source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      }],
    });
  });

  it(`Action creator for getFilmsByGenre returns films filtered by default genre`, () => {
    expect(ActionCreator.getFilmsByGenre(`All genres`)).toEqual({
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: mockFilms,
    });
  });
});

