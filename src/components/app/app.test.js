import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

describe(`AppTest`, () => {
  it(`render App`, () => {
    const tree = renderer
      .create(
          <App
            releaseDate={1984}
            filmGenre={`comedy`}
            films = {[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`]}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
