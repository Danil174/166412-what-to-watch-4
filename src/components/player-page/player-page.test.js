
import React from "react";
import renderer from "react-test-renderer";
import PlayerPage from "./player-page.jsx";

const testFilm = {
  title: `test`,
};

it(`Render Player`, () => {
  const tree = renderer
    .create(
        <PlayerPage
          film={testFilm}
          onFullScreenBtnClick={()=>{}}
          playPauseSetter={()=>{}}
          progress={0}
          isPlaying={false}
          duration={0}
        >
          <video/>
        </PlayerPage>
    );
  expect(tree).toMatchSnapshot();
});
