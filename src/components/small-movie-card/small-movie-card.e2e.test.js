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
  actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  bgColor: `#A6B7AC`,
  cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  director: `Martin Scorsese`,
  duration: 167,
  genre: `Crime`,
  id: 18,
  isFavorite: false,
  movieScore: 10,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  ratingCount: 370881,
  releaseDate: 2002,
  source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  synopsis: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  title: `Gangs of new york`,
};

it(`Small Movie card hovered`, () => {
  const onCardMouseEnter = jest.fn();
  const onCardMouseLeave = jest.fn();
  const store = mockStore({});

  const card = mount(
      <Provider store={store}>
        <SmallMovieCard
          isPlaying={false}
          film={film}
          onMouseOver={onCardMouseEnter}
          onMouseOut={onCardMouseLeave}
        />
      </Provider>
  );

  const currentCar = card.find(`.small-movie-card`);

  currentCar.simulate(`mouseOver`);
  expect(onCardMouseEnter.mock.calls.length).toBe(1);

  currentCar.simulate(`mouseOut`);
  expect(onCardMouseLeave.mock.calls.length).toBe(1);
});
