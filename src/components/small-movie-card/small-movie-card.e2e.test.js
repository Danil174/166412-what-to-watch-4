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
  const onCardHoverHandler = jest.fn();

  const card = shallow(
      <SmallMovieCard
        film={film}
        onCardHoverHandler={onCardHoverHandler}
      />
  );

  const currentCar = card.find(`.small-movie-card`);

  currentCar.props().onMouseOver();

  expect(onCardHoverHandler.mock.calls.length).toBe(1);
});
