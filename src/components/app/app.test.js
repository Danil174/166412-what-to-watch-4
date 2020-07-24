import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

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

const genres = [`All genres`, `Drama`, `Documentary`, `Horror`];

describe(`AppTest`, () => {
  it(`render App`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        loadFilmsError: null,
        loadPromoError: null,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              films={testFilms}
              promoFilm={promoFilm}
              selectedFilmID={1}
              genres={genres}
              activeGenre={`Drama`}
              loadPromoError={null}
              loadFilmsError={null}
              onTitleOrImgClickHandler={() => {}}
              onGenreItemClick={() => {}}
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
