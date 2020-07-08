import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";

const mockStore = configureStore([]);

const testFilms = [
  {
    id: 16,
    title: `Snatch`,
    src: `img/snatch.jpg`,
    source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 17,
    title: `War of the Worlds`,
    src: `img/war-of-the-worlds.jpg`,
    source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 18,
    title: `We Need to Talk about Kevin`,
    src: `img/we-need-to-talk-about-kevin.jpg`,
    source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 19,
    title: `What We Do in the Shadows`,
    src: `img/what-we-do-in-the-shadows.jpg`,
    source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  }
];

const activeGenre = `Drama`;

const genres = [`All genres`, `Drama`, `Documentary`, `Horror`];

describe(`AppTest`, () => {
  it(`render App`, () => {
    const store = mockStore({});
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              films = {testFilms}
              genres={genres}
              activeGenre={activeGenre}
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
