/* eslint-disable camelcase */
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {reducer, ActionType, Operation, ActionCreator} from "./films.js";

const api = createAPI(() => {});

const genres = [`All genres`, `Crime`, `Adventure`, `Action`, `Comedy`];

const fakeFilms = [{
  actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  bgColor: `#A6B7AC`,
  cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  director: `Martin Scorsese`,
  duration: 167,
  genre: `Crime`,
  id: 1,
  isFavorite: false,
  movieScore: 8.8,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  ratingCount: 370881,
  releaseDate: 2002,
  source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  synopsis: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  title: `Gangs of new york`,
}, {
  actors: [`Jared Gilman`, `Kara Hayward`, `Bruce Willis`],
  bgColor: `#D8E3E5`,
  cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/bacskground/Moonrise_Kingdom.jpg`,
  director: `Wes Anderson`,
  duration: 94,
  genre: `Adventure`,
  id: 2,
  isFavorite: false,
  movieScore: 7.9,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  ratingCount: 291183,
  releaseDate: 2012,
  source: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  synopsis: `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  title: `Moonrise Kingdom`,
}];

describe(`FilmReducerTest`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      films: [],
      genres: [],
      loading: false,
      loadingFilmError: null,
    });
  });

  it(`Reducer should update films by fakeFilms`, () => {
    expect(reducer({
      films: [],
      genres: [],
      loading: false,
      loadingFilmError: null,
    }, {
      type: ActionType.LOAD_FILMS,
      payload: fakeFilms,
    })).toEqual({
      films: fakeFilms,
      genres: [],
      loading: false,
      loadingFilmError: null,
    });
  });

  it(`Reducer should update genres`, () => {
    expect(reducer({
      films: fakeFilms,
      genres: [],
      loading: false,
      loadingFilmError: null,
    }, {
      type: ActionType.GET_GENRES,
      payload: genres,
    })).toEqual({
      films: fakeFilms,
      genres,
      loading: false,
      loadingFilmError: null,
    });
  });

  it(`set films upload error`, () => {
    expect(reducer({
      films: [],
      genres: [],
      loading: false,
      loadingFilmError: null,
    }, {
      type: ActionType.SET_LOAD_FILMS_ERROR,
      payload: 404,
    })).toEqual({
      films: [],
      genres: [],
      loading: false,
      loadingFilmError: 404,
    });
  });

  it(`set start loading`, () => {
    expect(reducer({
      films: [],
      genres: [],
      loading: false,
      loadingFilmError: null,
    }, {
      type: ActionType.START_LOADING,
    })).toEqual({
      films: [],
      genres: [],
      loading: true,
      loadingFilmError: null,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`loadFilms`, () => {
    expect(ActionCreator.loadFilms(fakeFilms)).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: fakeFilms
    });
  });

  it(`getGenres`, () => {
    expect(ActionCreator.getGenres(genres)).toEqual({
      type: ActionType.GET_GENRES,
      payload: genres
    });
  });

  it(`setLoadPromoError`, () => {
    expect(ActionCreator.setError(404)).toEqual({
      type: ActionType.SET_LOAD_FILMS_ERROR,
      payload: 404
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, []);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.LOAD_FILMS,
          payload: [],
        });
      });
  });
});
