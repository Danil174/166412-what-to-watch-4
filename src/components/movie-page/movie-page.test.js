import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus, MovieTabsMap} from "../../const.js";

const mockStore = configureStore([]);

const fakeComments = [
  {
    commentID: 1,
    date: new Date(),
    rating: 5.5,
    text: `test test`,
    userID: 55,
    userName: `Tom`,
  },
  {
    commentID: 45,
    date: new Date(),
    rating: 8,
    text: `test test`,
    userID: 11,
    userName: `Den`,
  },
];

const fakeFilm = {
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

const testFilms = [
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
    actors: [`Leonardo DiCaprio`, `Daniel Day-Lewis`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin `,
    duration: 167,
    genre: `Crime`,
    id: 15,
    isFavorite: true,
    movieScore: 10,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 3708,
    releaseDate: 2002,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
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

describe(`MoviePageTest`, () => {
  it(`render MoviePage`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {avatarUrl: `test.jpg`},
      },
      [NameSpace.APP_STATE]: {
        activeMovieTab: MovieTabsMap.OVERVIEW,
      },
      [NameSpace.DATA]: {
        films: testFilms,
        comments: []
      },
    });
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MoviePage
                comments={fakeComments}
                preview={``}
                source={``}
                activeTab={MovieTabsMap.OVERVIEW}
                films={testFilms}
                film={fakeFilm}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
              />
            </Provider>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
