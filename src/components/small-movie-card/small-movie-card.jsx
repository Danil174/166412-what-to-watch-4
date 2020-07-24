import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import PropTypes from "prop-types";
import {SmallCardVideoSettings} from "../../const.js";

import VideoPlayer from "../video/video.jsx";
import withVideo from "../../hocs/with-video/with-video.js";
const Video = withVideo(VideoPlayer);

class SmallMovieCard extends PureComponent {
  render() {
    const {film, onTitleOrImgClickHandler, onMouseOver, onMouseOut, isPlaying, selectFilm} = this.props;
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
            selectFilm(id);
            onTitleOrImgClickHandler();
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
            selectFilm(id);
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
  isPlaying: PropTypes.bool.isRequired,
  selectFilm: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onTitleOrImgClickHandler: PropTypes.func.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  selectFilm(id) {
    dispatch(ActionCreator.getSelectedFilm(id));
  },
});


export {SmallMovieCard};
export default connect(null, mapDispatchToProps)(SmallMovieCard);
