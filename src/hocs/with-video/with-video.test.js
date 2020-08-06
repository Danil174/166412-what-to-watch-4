import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withVideo from "./with-video.js";
import {SmallCardVideoSettings} from "../../const.js";


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
  ]).isRequired,
};

const MockComponentWrapped = withVideo(MockComponent);

it(`withVideo is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      preview={`https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jp`}
      source={`http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`}
      isMuted={SmallCardVideoSettings.IS_MUTED}
      width={SmallCardVideoSettings.WIDTH}
      height={SmallCardVideoSettings.HEIGHT}
      isPlaying={false}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
