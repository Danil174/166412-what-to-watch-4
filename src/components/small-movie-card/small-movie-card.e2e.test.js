import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const film = {
  id: 77,
  title: `Test film`,
  src: `img/midnight-special.jpg`,
  source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

const mockEvent = {
  preventDefault() {}
};

it(`Small Movie card hovered`, () => {
  const onCardMouseEnter = jest.fn();
  const onCardMouseLeave = jest.fn();
  const onTitleOrImgClickHandler = jest.fn();

  const card = shallow(
      <SmallMovieCard
        film={film}
        onCardMouseEnter={onCardMouseEnter}
        onCardMouseLeave={onCardMouseLeave}
        onTitleOrImgClickHandler={onTitleOrImgClickHandler}
      />
  );

  const currentCar = card.find(`.small-movie-card`);

  currentCar.simulate(`mouseOver`);
  expect(onCardMouseEnter.mock.calls.length).toBe(1);

  currentCar.simulate(`mouseOut`);
  expect(onCardMouseLeave.mock.calls.length).toBe(1);

  const title = card.find(`.small-movie-card__title`);
  const imgWrapper = card.find(`.small-movie-card__image`);

  imgWrapper.simulate(`click`);
  title.simulate(`click`, mockEvent);
  expect(onTitleOrImgClickHandler).toHaveBeenCalledTimes(2);
});
