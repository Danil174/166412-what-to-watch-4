import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        film: null,
        isPlaying: true,
        progress: 0,
        duration: 0,
      };

      this.fullScreenHandler = this.fullScreenHandler.bind(this);
      this.playPauseSetter = this.playPauseSetter.bind(this);
    }

    _initialize() {
      const currentFilm = this.props.films.find((it) => it.id === Number(this.props.match.params.id));
      if (!currentFilm) {
        return;
      }
      const video = this._videoRef.current;
      video.src = currentFilm.source;
      video.poster = currentFilm.cover;

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

    componentDidMount() {
      this._initialize();
    }

    componentDidUpdate() {
      const video = this._videoRef.current;
      const currentFilm = this.props.films.find((it) => it.id === Number(this.props.match.params.id));

      if (this._videoRef.current.src !== currentFilm.source) {
        this._initialize();
      }

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      if (!video) {
        return;
      }

      video.src = ``;
      video.poster = ``;

      video.onloadedmetadata = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
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
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
    films: PropTypes.arrayOf(
        PropTypes.shape({
          actors: PropTypes.arrayOf(PropTypes.string).isRequired,
          bgColor: PropTypes.string.isRequired,
          cover: PropTypes.string.isRequired,
          director: PropTypes.string.isRequired,
          duration: PropTypes.number.isRequired,
          genre: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          isFavorite: PropTypes.bool.isRequired,
          movieScore: PropTypes.number.isRequired,
          poster: PropTypes.string.isRequired,
          preview: PropTypes.string.isRequired,
          previewVideoLink: PropTypes.string.isRequired,
          ratingCount: PropTypes.number.isRequired,
          releaseDate: PropTypes.number.isRequired,
          source: PropTypes.string.isRequired,
          synopsis: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
    ).isRequired,
    film: PropTypes.shape({
      source: PropTypes.string,
      cover: PropTypes.string,
    }),
  };

  return WithPlayer;
};

export default withPlayer;
