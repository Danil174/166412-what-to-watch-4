import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SmallCardVideoSettings, AppRoute} from "../../const.js";
import history from "../../history.js";

import VideoPlayer from "../video/video.jsx";
import withVideo from "../../hocs/with-video/with-video.js";
const Video = withVideo(VideoPlayer);

class SmallMovieCard extends PureComponent {
  render() {
    const {film, onMouseOver, onMouseOut, isPlaying} = this.props;
    const {id, title, preview, source} = film;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseOver={() => onMouseOver()}
        onMouseOut={() => onMouseOut()}
      >
        <div
          className="small-movie-card__image"
          onClick={() => {
            history.push(`${AppRoute.MOVIE_PAGE}/${id}`);
          }}
        >
          <Video
            preview={preview}
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
            history.push(`${AppRoute.MOVIE_PAGE}/${id}`);
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
  isPlaying: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
};


export default SmallMovieCard;
