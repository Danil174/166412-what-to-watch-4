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

const mockEvent = {
  preventDefault() {}
};

it(`Small Movie card hovered`, () => {
  const onCardHoverHandler = jest.fn();
  const onTitleOrImgClickHandler = jest.fn();

  const card = shallow(
      <SmallMovieCard
        film={film}
        onCardHoverHandler={onCardHoverHandler}
        onTitleOrImgClickHandler={onTitleOrImgClickHandler}
      />
  );

  const currentCar = card.find(`.small-movie-card`);

  currentCar.simulate(`mouseOver`);
  expect(onCardHoverHandler.mock.calls.length).toBe(1);

  const title = card.find(`.small-movie-card__title`);
  const imgWrapper = card.find(`.small-movie-card__image`);

  imgWrapper.simulate(`click`);
  title.simulate(`click`, mockEvent);
  expect(onTitleOrImgClickHandler).toHaveBeenCalledTimes(2);
});
