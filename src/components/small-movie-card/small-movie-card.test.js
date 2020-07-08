import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const film = {
  id: 7,
  title: `Midnight Special`,
  src: `img/midnight-special.jpg`,
  source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

describe(`small movie card rendered correct`, () => {
  it(`render SmallMovieCard`, () => {
    const tree = renderer
      .create(
          <SmallMovieCard
            isPlaying={false}
            film={film}
            onMouseOver={() => {}}
            onMouseOut={() => {}}
            onTitleOrImgClickHandler={() => {}}
          />, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
