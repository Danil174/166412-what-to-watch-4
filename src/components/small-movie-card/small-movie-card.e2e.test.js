import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

const film = {
  id: 17,
  genre: `Documentary`,
  title: `War of the Worlds`,
  src: `img/war-of-the-worlds.jpg`,
  source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  releaseDate: 2014,
  synopsis: [
    `In the 1930s`,
    `test`,
  ],
  movieScore: 8.9,
  ratingCount: 240,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

const mockEvent = {
  preventDefault() {}
};

it(`Small Movie card hovered`, () => {
  const onCardMouseEnter = jest.fn();
  const onCardMouseLeave = jest.fn();
  const onTitleOrImgClickHandler = jest.fn();
  const store = mockStore({});

  const card = mount(
      <Provider store={store}>
        <SmallMovieCard
          isPlaying={false}
          film={film}
          onMouseOver={onCardMouseEnter}
          onMouseOut={onCardMouseLeave}
          onTitleOrImgClickHandler={onTitleOrImgClickHandler}
        />
      </Provider>
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
