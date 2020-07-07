import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {smallCardVideoStartTimeOut} from "../../const.js";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
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

    componentDidUpdate() {
      const video = this._videoRef.current;
      if (this.props.isPlaying) {
        this.timeout = setTimeout(() => video.play(), smallCardVideoStartTimeOut);
      } else {
        clearTimeout(this.timeout);
        video.load();
      }
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
        <Component
          {...this.props}
        >
          <video
            width={width}
            height={height}
            ref={this._videoRef}
          >
          </video>
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    isMuted: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };


  return WithVideo;
};

export default withVideo;
