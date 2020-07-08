import React from 'react';
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import withVideo from "./with-video.js";
import {SmallCardVideoSettings} from "../../const.js";

const film = {
  id: 7,
  title: `Midnight Special`,
  src: `img/midnight-special.jpg`,
  source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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
      poster={film.src}
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
      poster={film.src}
      source={film.source}
      isMuted={SmallCardVideoSettings.IS_MUTED}
      width={SmallCardVideoSettings.WIDTH}
      height={SmallCardVideoSettings.HEIGHT}
      isPlaying={isPlaying}
    />);

    expect(wrapper.props().isPlaying).toBe(isPlaying);
  });

});
