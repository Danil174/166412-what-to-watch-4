import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../const.js";

import Main from "./main.jsx";

const mockStore = configureStore([]);

const testFilmsList = [
  {
    actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin Scorsese`,
    duration: 100,
    genre: `Crime`,
    id: 10,
    isFavorite: false,
    movieScore: 10,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 370881,
    releaseDate: 2002,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862, his father's killer.`,
    title: `Gangs of new york`,
  },
  {
    actors: [`Leonardo DiCaprio`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin Scorsese`,
    duration: 500,
    genre: `Crime`,
    id: 55,
    isFavorite: false,
    movieScore: 10,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 37088566781,
    releaseDate: 2020,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862`,
    title: `Gangs of new york`,
  },
];

const promoFilm = {
  actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  bgColor: `#A6B7AC`,
  cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  director: `Martin Scorsese`,
  duration: 100,
  genre: `Crime`,
  id: 10,
  isFavorite: false,
  movieScore: 10,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  ratingCount: 370881,
  releaseDate: 2002,
  source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  synopsis: `In 1862, his father's killer.`,
  title: `Gangs of new york`,
};

const genres = [`Comedies`, `Crime`, `Documentary`];

describe(`MainTest`, () => {
  it(`render Main`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        loadFilmsError: null,
        loadPromoError: null,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {avatarUrl: `test.jpg`},
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              filmsList = {testFilmsList}
              promoFilm={promoFilm}
              onGenreItemClick={() => {}}
              genres={genres}
              activeGenre={`Comedies`}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
