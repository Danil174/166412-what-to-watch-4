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

describe(`AppTest`, () => {
  it(`render App`, () => {
    const tree = renderer
      .create(
          <App
            releaseDate={1984}
            filmGenre={`comedy`}
            films = {testFilms}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
