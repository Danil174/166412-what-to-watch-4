import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const testFilms = [
  {
    title: `Aviator`,
    src: `img/aviator.jpg`,
  },
  {
    title: `Bohemian Rhapsody`,
    src: `img/bohemian-rhapsody.jpg`,
  },
  {
    title: `Dardjeeling Limited`,
    src: `img/dardjeeling-limited.jpg`,
  },
];

const testFilm = {
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

describe(`AppTest`, () => {
  it(`render App`, () => {
    const tree = renderer
      .create(
          <App
            releaseDate={1984}
            filmGenre={`comedy`}
            films = {testFilms}
            film={testFilm}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
