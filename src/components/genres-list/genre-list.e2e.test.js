import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const genres = [`Comedies`, `Crime`, `Documentary`, `Dramas`, `Horror`, `Kids & Family`, `Romance`, `Sci-Fi`, `Thrillers`];
const activeGenre = `Comedies`;

const mockEvent = {
  preventDefault() {}
};

it(`generes list clicked`, () => {
  const onGenreItemClick = jest.fn();

  const card = mount(
      <GenresList
        genres={genres}
        activeGenre={activeGenre}
        onGenreItemClick={onGenreItemClick}
      />
  );

  const firstGenre = card.find(`.catalog__genres-link`).at(0);
  const lastGenre = card.find(`.catalog__genres-link`).at(genres.length - 1);

  firstGenre.simulate(`click`, mockEvent);
  lastGenre.simulate(`click`, mockEvent);
  expect(onGenreItemClick).toHaveBeenCalledTimes(2);
});
