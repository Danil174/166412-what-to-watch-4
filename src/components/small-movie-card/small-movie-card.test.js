import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const film = {
  title: `Fantastic Beasts`,
  src: `img/johnny-english.jpg`,
};

describe(`FilmTest`, () => {
  it(`render SmallMovieCard`, () => {
    const tree = renderer
      .create(
          <SmallMovieCard
            film={film}
            onFilmTitleClick={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
