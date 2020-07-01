import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const genres = [`Comedies`, `Crime`, `Documentary`, `Dramas`, `Horror`, `Kids & Family`, `Romance`, `Sci-Fi`, `Thrillers`];

describe(`GenresListTest`, () => {
  it(`render GenresList`, () => {
    const tree = renderer
      .create(
          <GenresList
            genres = {genres}
            onGenreItemClickHandler={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
