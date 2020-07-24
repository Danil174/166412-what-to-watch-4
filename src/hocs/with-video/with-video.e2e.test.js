import React from 'react';
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import withVideo from "./with-video.js";
import {SmallCardVideoSettings} from "../../const.js";

const film = {
  actors: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
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
  synopsis: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  title: `Gangs of new york`,
};

configure({adapter: new Adapter()});

const VideoPlayer = (props) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

VideoPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

describe(`Video.e2e.test`, () => {

  it(`Video play=true`, () => {
    const isPlaying = true;
    const VideoPlayerWrapped = withVideo(VideoPlayer);

    const wrapper = mount(<VideoPlayerWrapped
      preview={film.preview}
      source={film.source}
      isMuted={SmallCardVideoSettings.IS_MUTED}
      width={SmallCardVideoSettings.WIDTH}
      height={SmallCardVideoSettings.HEIGHT}
      isPlaying={isPlaying}
    />);

    expect(wrapper.props().isPlaying).toBe(isPlaying);
  });

  it(`Video play=false`, () => {
    const isPlaying = false;
    const VideoPlayerWrapped = withVideo(VideoPlayer);

    const wrapper = mount(<VideoPlayerWrapped
      preview={film.preview}
      source={film.source}
      isMuted={SmallCardVideoSettings.IS_MUTED}
      width={SmallCardVideoSettings.WIDTH}
      height={SmallCardVideoSettings.HEIGHT}
      isPlaying={isPlaying}
    />);

    expect(wrapper.props().isPlaying).toBe(isPlaying);
  });

});
