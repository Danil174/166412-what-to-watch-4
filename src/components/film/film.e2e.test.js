import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Film from "./film.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should welcome button be pressed`, () => {
  const onFilmTitleClick = jest.fn();

  const film = shallow(
      <Film
        film={`Fantastic Beasts`}
        onFilmTitleClick={onFilmTitleClick}
      />
  );

  const filmTitle = film.find(`.small-movie-card__title`);

  filmTitle.props().onClick();

  expect(onFilmTitleClick.mock.calls.length).toBe(1);
});
