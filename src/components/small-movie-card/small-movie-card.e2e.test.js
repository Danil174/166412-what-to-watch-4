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

it(`Small Movie card hovered`, () => {
  const onCardTitleClick = jest.fn();
  const onCardHoverHandler = jest.fn();

  const card = shallow(
      <SmallMovieCard
        film={film}
        onFilmTitleClick={onCardTitleClick}
        onCardHoverHandler={onCardHoverHandler}
      />
  );

  const currentCar = card.find(`.small-movie-card`);
  const cardTitle = card.find(`.small-movie-card__title`);

  currentCar.props().onMouseOver();
  cardTitle.props().onClick();

  expect(onCardHoverHandler.mock.calls.length).toBe(1);
  expect(onCardTitleClick.mock.calls.length).toBe(1);
});
