import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

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

describe(`MoviesListTest`, () => {
  it(`render MoviesList`, () => {
    const tree = renderer
      .create(
          <MoviesList
            filmsList = {testFilmsList}
            onCardHoverHandler={() => {}}
            onTitleOrImgClickHandler={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
