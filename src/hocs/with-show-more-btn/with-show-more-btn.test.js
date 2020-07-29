import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withShowMoreBtn from "./with-show-more-btn.js";

const testFilmsList = [
  {
    actors: [`Leonardo DiCaprio`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin Scorsese`,
    duration: 700,
    genre: `Crime`,
    id: 18,
    isFavorite: false,
    movieScore: 8.8,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 370881,
    releaseDate: 2002,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
    title: `Gangs of new york`,
  },
  {
    actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin Scorsese`,
    duration: 500,
    genre: `Crime`,
    id: 19,
    isFavorite: false,
    movieScore: 8.8,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 3708,
    releaseDate: 2020,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
    title: `Gangs of new york`,
  },
  {
    ators: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin Scorsese`,
    duration: 167,
    genre: `Crime`,
    id: 1,
    isFavorite: false,
    movieScore: 8.8,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 370881,
    releaseDate: 2002,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862, Amsterdam!`,
    title: `Gangs of new york`,
  }
];


const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const MockComponentWrapped = withShowMoreBtn(MockComponent);

it(`withShowMoreBtn is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      filmsList={testFilmsList}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
