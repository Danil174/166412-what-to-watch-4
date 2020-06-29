import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const testFilmsList = [
  {
    id: 18,
    title: `We Need to Talk about Kevin`,
    src: `img/we-need-to-talk-about-kevin.jpg`,
    source: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 19,
    title: `What We Do in the Shadows`,
    src: `img/what-we-do-in-the-shadows.jpg`,
    source: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  }
];

describe(`MainTest`, () => {
  it(`render Main`, () => {
    const tree = renderer
      .create(
          <Main
            date={1984}
            genre={`comedy`}
            filmsList = {testFilmsList}
            onTitleOrImgClickHandler={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
