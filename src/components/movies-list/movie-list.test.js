import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MoviesList from "./movies-list.jsx";

const mockStore = configureStore([]);

const testFilmsList = [
  {
    id: 17,
    genre: `Documentary`,
    title: `War of the Worlds`,
    src: `img/war-of-the-worlds.jpg`,
    source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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
    id: 18,
    genre: `Comedies`,
    title: `We Need to Talk about Kevin`,
    src: `img/we-need-to-talk-about-kevin.jpg`,
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
    id: 19,
    genre: `Horror`,
    title: `What We Do in the Shadows`,
    src: `img/what-we-do-in-the-shadows.jpg`,
    source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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
  }
];

describe(`MoviesListTest`, () => {
  it(`render MoviesList`, () => {
    const store = mockStore({});
    const tree = renderer
      .create(
          <Provider store={store}>
            <MoviesList
              filmsList = {testFilmsList}
              onTitleOrImgClickHandler={() => {}}
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
