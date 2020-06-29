import React from "react";
import renderer from "react-test-renderer";
import Video from "./video.jsx";
import {SmallCardVideoSettings} from "../../const.js";

const film = {
  id: 7,
  title: `Midnight Special`,
  src: `img/midnight-special.jpg`,
  source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

describe(`TestVideoComponent`, () => {
  it(`render Video component`, () => {
    const tree = renderer
      .create(
          <Video
            poster={film.src}
            source={film.source}
            isMuted={SmallCardVideoSettings.IS_MUTED}
            width={SmallCardVideoSettings.WIDTH}
            height={SmallCardVideoSettings.HEIGHT}
            isPlaying={false}
          />, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
