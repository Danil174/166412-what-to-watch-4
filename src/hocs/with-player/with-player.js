import React, {createRef, PureComponent} from "react";
import {connect} from "react-redux";
import {getFilmByID, getLoadingStatus} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isPlaying: true,
        progress: 0,
        duration: 0,
      };

      this.fullScreenHandler = this.fullScreenHandler.bind(this);
      this.playPauseSetter = this.playPauseSetter.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;

      if (this.props.film) {
        video.src = this.props.film.source;
        video.poster = this.props.film.cover;

        video.onloadedmetadata = () => {
          this.setState({
            duration: video.duration,
          });
        };

        video.onplay = () => this.setState({
          isPlaying: true,
        });

        video.onpause = () => this.setState({
          isPlaying: false,
        });

        video.ontimeupdate = () => this.setState({
          progress: Math.floor(video.currentTime),
        });
      }
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      if (this.props.film) {
        video.src = ``;
        video.poster = ``;

        video.onloadedmetadata = null;
        video.onplay = null;
        video.onpause = null;
        video.ontimeupdate = null;
      }
    }

    fullScreenHandler() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    playPauseSetter() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          onFullScreenBtnClick={this.fullScreenHandler}
          playPauseSetter={this.playPauseSetter}
          duration={this.state.duration}
          progress={this.state.progress}
          isPlaying={this.state.isPlaying}
        >
          <video
            className="player__video"
            ref={this._videoRef}
          >
          </video>
        </Component>
      );
    }
  }

  WithPlayer.propTypes = {
    film: PropTypes.shape({
      source: PropTypes.string,
      cover: PropTypes.string,
    }),
  };

  const mapStateToProps = (state, props) => {
    return ({
      film: getFilmByID(props.match.params.id, state),
      loading: getLoadingStatus(state),
    });
  };

  return connect(mapStateToProps)(WithPlayer);
};

export default withPlayer;
