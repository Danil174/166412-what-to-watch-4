import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const fakeFilm = {
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
};

describe(`MoviePageTest`, () => {
  it(`render MoviePage`, () => {
    const tree = renderer
      .create(
          <MoviePage
            film={fakeFilm}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
