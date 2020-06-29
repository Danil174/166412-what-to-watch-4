import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Video from "./video.jsx";
import {SmallCardVideoSettings} from "../../const.js";

const film = {
  id: 7,
  title: `Midnight Special`,
  src: `img/midnight-special.jpg`,
  source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Video.e2e.test`, () => {

  it(`Video play=true`, () => {
    const isPlaying = true;

    const videoComponent = mount(
        <Video
          poster={film.src}
          source={film.source}
          isMuted={SmallCardVideoSettings.IS_MUTED}
          width={SmallCardVideoSettings.WIDTH}
          height={SmallCardVideoSettings.HEIGHT}
          isPlaying={isPlaying}
        />
    );

    expect(videoComponent.props().isPlaying).toBe(isPlaying);
  });

  it(`Video play=false`, () => {
    const isPlaying = false;

    const videoComponent = mount(
        <Video
          poster={film.src}
          source={film.source}
          isMuted={SmallCardVideoSettings.IS_MUTED}
          width={SmallCardVideoSettings.WIDTH}
          height={SmallCardVideoSettings.HEIGHT}
          isPlaying={isPlaying}
        />
    );

    expect(videoComponent.props().isPlaying).toBe(isPlaying);
  });

});
