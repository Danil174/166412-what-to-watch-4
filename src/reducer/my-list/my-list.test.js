import {reducer, ActionType, ActionCreator} from "./my-list.js";

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

describe(`MyListReducerTest`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      myFilms: [],
      loadStatus: false,
      myListError: null,
    });
  });

  it(`Reducer should update myFilms by fakeFilms`, () => {
    expect(reducer({
      myFilms: [],
      loadStatus: false,
      myListError: null,
    }, {
      type: ActionType.LOAD_MY_LIST,
      payload: fakeFilms,
    })).toEqual({
      myFilms: fakeFilms,
      loadStatus: false,
      myListError: null,
    });
  });

  it(`Reducer should change loadStatus`, () => {
    expect(reducer({
      myFilms: [],
      loadStatus: false,
      myListError: null,
    }, {
      type: ActionType.START_LOADING_MY_LIST,
    })).toEqual({
      myFilms: [],
      loadStatus: true,
      myListError: null,
    });
  });

  it(`Reducer should change loadStatus`, () => {
    expect(reducer({
      myFilms: [],
      loadStatus: true,
      myListError: null,
    }, {
      type: ActionType.END_LOADING_MY_LIST,
    })).toEqual({
      myFilms: [],
      loadStatus: false,
      myListError: null,
    });
  });

  it(`Reducer should set review error`, () => {
    expect(reducer({
      myFilms: [],
      loadStatus: false,
      myListError: null,
    }, {
      type: ActionType.SET_LOAD_MY_LIST_ERROR,
      payload: 404,
    })).toEqual({
      myFilms: [],
      loadStatus: false,
      myListError: 404,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`startPending`, () => {
    expect(ActionCreator.startLoadingMyList()).toEqual({
      type: ActionType.START_LOADING_MY_LIST,
    });
  });

  it(`endPending`, () => {
    expect(ActionCreator.endLoadingMyList()).toEqual({
      type: ActionType.END_LOADING_MY_LIST,
    });
  });

  it(`setReviewError`, () => {
    expect(ActionCreator.setMyListError(404)).toEqual({
      type: ActionType.SET_LOAD_MY_LIST_ERROR,
      payload: 404
    });
  });
});
