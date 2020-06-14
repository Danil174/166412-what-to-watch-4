import React from "react";
import renderer from "react-test-renderer";
import Film from "./film.jsx";

describe(`FilmTest`, () => {
  it(`render Film`, () => {
    const tree = renderer
      .create(
          <Film
            film={`Fantastic Beasts`}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
