import {reducer, ActionCreator, ActionType, defaultGenre, genres, getFilmsByGenre} from "./reducer.js";
import mockFilms from "./mocks/films.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: defaultGenre,
    genres
  });
});

it(`Reducer should change genre filter`, () => {
  expect(reducer({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: `Documentary`,
    genres
  }, {
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: `Dramas`,
  })).toEqual({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: `Dramas`,
    genres
  });

  expect(reducer({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: `Dramas`,
    genres
  }, {
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: `Kids & Family`,
  })).toEqual({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: `Kids & Family`,
    genres
  });
});

it(`Reducer should return filtered films`, () => {
  expect(reducer({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: defaultGenre,
    genres
  }, {
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: getFilmsByGenre(mockFilms, `Romance`),
  })).toEqual({
    films: getFilmsByGenre(mockFilms, `Romance`),
    selectedFilm: null,
    activeGenre: defaultGenre,
    genres
  });

  expect(reducer({
    films: getFilmsByGenre(mockFilms, `Romance`),
    selectedFilm: null,
    activeGenre: `Dramas`,
    genres
  }, {
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: mockFilms,
  })).toEqual({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: `Dramas`,
    genres
  });
});

it(`Reducer should return get selected film`, () => {
  expect(reducer({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: defaultGenre,
    genres
  }, {
    type: ActionType.GET_SELECT_FILM,
    payload: mockFilms[1],
  })).toEqual({
    films: mockFilms,
    selectedFilm: mockFilms[1],
    activeGenre: defaultGenre,
    genres
  });

  expect(reducer({
    films: mockFilms,
    selectedFilm: null,
    activeGenre: defaultGenre,
    genres
  }, {
    type: ActionType.GET_SELECT_FILM,
    payload: mockFilms[5],
  })).toEqual({
    films: mockFilms,
    selectedFilm: mockFilms[5],
    activeGenre: defaultGenre,
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
        poster: `img/the-grand-budapest-hotel-poster.jpg`,
        cover: `img/bg-the-grand-budapest-hotel.jpg`,
        releaseDate: 2014,
        synopsis: [
          `In the 1930s`,
          `test`,
        ],
        movieScore: 8.9,
        ratingCount: 240,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      },
      {
        id: 16,
        genre: `Crime`,
        title: `Snatch`,
        src: `img/snatch.jpg`,
        source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        poster: `img/the-grand-budapest-hotel-poster.jpg`,
        cover: `img/bg-the-grand-budapest-hotel.jpg`,
        releaseDate: 2014,
        synopsis: [
          `In the 1930s`,
          `test`,
        ],
        movieScore: 8.9,
        ratingCount: 240,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
      }],
    });
  });

  it(`Action creator for getFilmsByGenre returns films filtered by default genre`, () => {
    expect(ActionCreator.getFilmsByGenre(`All genres`)).toEqual({
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: mockFilms,
    });
  });

  it(`Action creator for getSelectedFilm returns film by id`, () => {
    expect(ActionCreator.getSelectedFilm(5)).toEqual({
      type: ActionType.GET_SELECT_FILM,
      payload: mockFilms[4],
    });
  });
});

