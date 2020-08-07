
import React from "react";
import renderer from "react-test-renderer";
import PlayerPage from "./player-page.jsx";

const testFilm = {
  actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  bgColor: `#A6B7AC`,
  cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  director: `Martin Scorsese`,
  duration: 100,
  genre: `Crime`,
  id: 10,
  isFavorite: false,
  movieScore: 10,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  ratingCount: 370881,
  releaseDate: 2002,
  source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  synopsis: `In 1862, his father's killer.`,
  title: `Gangs of new york`,
};

const testFilmsList = [
  {
    actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin Scorsese`,
    duration: 100,
    genre: `Crime`,
    id: 10,
    isFavorite: false,
    movieScore: 10,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 370881,
    releaseDate: 2002,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862, his father's killer.`,
    title: `Gangs of new york`,
  },
  {
    actors: [`Leonardo DiCaprio`],
    bgColor: `#A6B7AC`,
    cover: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    director: `Martin Scorsese`,
    duration: 500,
    genre: `Crime`,
    id: 55,
    isFavorite: false,
    movieScore: 10,
    poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    preview: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    ratingCount: 37088566781,
    releaseDate: 2020,
    source: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    synopsis: `In 1862`,
    title: `Gangs of new york`,
  },
];

it(`Render Player`, () => {
  const tree = renderer
    .create(
        <PlayerPage
          film={testFilm}
          films={testFilmsList}
          onFullScreenBtnClick={()=>{}}
          handlePlayPauseBtnClick={()=>{}}
          progress={0}
          isPlaying={false}
          duration={0}
        >
          <video/>
        </PlayerPage>
    );
  expect(tree).toMatchSnapshot();
});
