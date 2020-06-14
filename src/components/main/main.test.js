import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

describe(`MainTest`, () => {
  it(`render Main`, () => {
    const tree = renderer
      .create(
          <Main
            date={1984}
            genre={`comedy`}
            filmsList = {[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`]}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
