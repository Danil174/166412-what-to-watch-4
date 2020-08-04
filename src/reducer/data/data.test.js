/* eslint-disable camelcase */
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {reducer, ActionType, Operation, ActionCreator} from "./data.js";

const api = createAPI(() => {});

const rawFilms = [{
  background_color: `#A6B7AC`,
  background_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  director: `Martin Scorsese`,
  genre: `Crime`,
  id: 1,
  is_favorite: false,
  name: `Gangs of new york`,
  poster_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  preview_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 8.8,
  released: 2002,
  run_time: 167,
  scores_count: 370881,
  starring: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
}, {
  background_color: `#D8E3E5`,
  background_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
  description: `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  director: `Wes Anderson`,
  genre: `Adventure`,
  id: 2,
  is_favorite: false,
  name: `Moonrise Kingdom`,
  poster_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  preview_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 7.9,
  released: 2012,
  run_time: 94,
  scores_count: 291183,
  starring: [`Jared Gilman`, `Kara Hayward`, `Bruce Willis`],
  video_link: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
}];


const fakePromo = {
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
};

describe(`dataReducerTest`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      promoFilm: {},
      comments: [],
      loadPromoError: null,
      loadCommentsError: null,
      setFavoriteError: null,
    });
  });

  it(`Reducer should update promo by fakePromo`, () => {
    expect(reducer({
      promoFilm: {},
      comments: [],
      loadPromoError: null,
      loadCommentsError: null,
      setFavoriteError: null,
    }, {
      type: ActionType.LOAD_PROMO,
      payload: fakePromo,
    })).toEqual({
      promoFilm: fakePromo,
      comments: [],
      loadPromoError: null,
      loadCommentsError: null,
      setFavoriteError: null,
    });
  });

  it(`set promo upload error`, () => {
    expect(reducer({
      promoFilm: {},
      comments: [],
      loadPromoError: null,
      loadCommentsError: null,
      setFavoriteError: null,
    }, {
      type: ActionType.SET_LOAD_PROMO_ERROR,
      payload: 404,
    })).toEqual({
      promoFilm: {},
      comments: [],
      loadPromoError: 404,
      loadCommentsError: null,
      setFavoriteError: null,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`loadPromo`, () => {
    expect(ActionCreator.loadPromo(fakePromo)).toEqual({
      type: ActionType.LOAD_PROMO,
      payload: fakePromo
    });
  });

  it(`setLoadPromoError`, () => {
    expect(ActionCreator.setLoadPromoError(404)).toEqual({
      type: ActionType.SET_LOAD_PROMO_ERROR,
      payload: 404
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = Operation.loadPromo();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, rawFilms[0]);

    return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO,
          payload: fakePromo,
        });
      });
  });
});
