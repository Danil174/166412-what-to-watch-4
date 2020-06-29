import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";
import {smallCardVideoStartTimeOut} from "../../const.js";

class Video extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isLoading: true,
    };

    this.timeout = null;
  }

  componentDidMount() {
    const {source, poster, isMuted} = this.props;

    const video = this._videoRef.current;

    video.src = source;
    video.poster = poster;
    video.muted = isMuted;

    video.oncanplaythrough = () => {
      this.setState({
        isLoading: false,
      });
    };
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.poster = null;
    video.video = null;
  }

  render() {
    const {width, height} = this.props;

    return (
      <Fragment>
        <video
          width={width}
          height={height}
          ref={this._videoRef}
        >
        </video>
      </Fragment>
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    if (this.props.isPlaying) {
      this.timeout = setTimeout(() => video.play(), smallCardVideoStartTimeOut);
    } else {
      clearTimeout(this.timeout);
      video.load();
    }
  }
}

Video.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Video;
