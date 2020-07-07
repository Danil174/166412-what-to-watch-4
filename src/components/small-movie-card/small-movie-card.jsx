import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SmallCardVideoSettings} from "../../const.js";

import VideoPlayer from "../video/video.jsx";
import withVideo from "../../hocs/with-video/with-video.js";
const Video = withVideo(VideoPlayer);

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {film, onTitleOrImgClickHandler, onCardMouseEnter, onCardMouseLeave} = this.props;
    const {id, title, src, source} = film;
    const {isPlaying} = this.state;

    return (
      <article
        id={id}
        className="small-movie-card catalog__movies-card"
        onMouseOver={() => {
          onCardMouseEnter(id);
          this.setState({isPlaying: true});
        }}
        onMouseOut={() => {
          onCardMouseLeave();
          this.setState({isPlaying: false});
        }}
      >
        <div
          className="small-movie-card__image"
          onClick={onTitleOrImgClickHandler}
        >
          <Video
            poster={src}
            source={source}
            isMuted={SmallCardVideoSettings.IS_MUTED}
            width={SmallCardVideoSettings.WIDTH}
            height={SmallCardVideoSettings.HEIGHT}
            isPlaying={isPlaying}
          />
        </div>
        <h3
          onClick={(evt) => {
            evt.preventDefault();
            onTitleOrImgClickHandler();
          }}
          className="small-movie-card__title"
        >
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  onTitleOrImgClickHandler: PropTypes.func.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
};

export default SmallMovieCard;
