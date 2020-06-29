import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const fakeFilm = {
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  movieTitle: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
  synopsis: [
    `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
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
          />, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
