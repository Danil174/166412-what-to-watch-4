import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const testFilmsList = [
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
  {
    title: `Fantastic Beasts The Crimes Of Grindelwald`,
    src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    title: `Johnny English`,
    src: `img/johnny-english.jpg`,
  },
];

describe(`MainTest`, () => {
  it(`render Main`, () => {
    const tree = renderer
      .create(
          <Main
            date={1984}
            genre={`comedy`}
            filmsList = {testFilmsList}
            onTitleClick={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
