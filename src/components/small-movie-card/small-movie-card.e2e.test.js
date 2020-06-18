import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const film = {
  title: `Midnight Special`,
  src: `img/moonrise-kingdom.jpg`,
};

it(`Should welcome button be pressed`, () => {
  const onCardTitleClick = jest.fn();

  const card = shallow(
      <SmallMovieCard
        film={film}
        onFilmTitleClick={onCardTitleClick}
      />
  );

  const cardTitle = card.find(`.small-movie-card__title`);

  cardTitle.props().onClick();

  expect(onCardTitleClick.mock.calls.length).toBe(1);
});
