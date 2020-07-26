import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import SmallMovieCard from "./small-movie-card.jsx";

const mockStore = configureStore([]);

const film = {
  id: 17,
  genre: `Documentary`,
  title: `War of the Worlds`,
  preview: `img/war-of-the-worlds.jpg`,
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
};

describe(`small movie card rendered correct`, () => {
  it(`render SmallMovieCard`, () => {
    const store = mockStore({});
    const tree = renderer
      .create(
          <Provider store={store}>
            <SmallMovieCard
              isPlaying={false}
              film={film}
              onMouseOver={() => {}}
              onMouseOut={() => {}}
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
