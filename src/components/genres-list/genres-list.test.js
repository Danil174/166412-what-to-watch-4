import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const genres = [`Comedies`, `Crime`, `Documentary`, `Dramas`, `Horror`, `Kids & Family`, `Romance`, `Sci-Fi`, `Thrillers`];
const activeGenre = `Comedies`;

describe(`GenresListTest`, () => {
  it(`render GenresList`, () => {
    const tree = renderer
      .create(
          <GenresList
            genres={genres}
            activeGenre={activeGenre}
            onGenreItemClick={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
