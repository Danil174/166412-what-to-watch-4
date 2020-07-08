import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withActiveVideo from "../../hocs/with-active-video/with-active-video.js";
const SmallMovieCardWrapper = withActiveVideo(SmallMovieCard);

class MoviesList extends PureComponent {
  render() {
    const {filmsList, onTitleOrImgClickHandler} = this.props;
    return (
      <div className="catalog__movies-list">
        {filmsList.map((film) => (
          <SmallMovieCardWrapper
            key={film.id}
            film={film}
            id={film.id}
            onTitleOrImgClickHandler={onTitleOrImgClickHandler}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  onTitleOrImgClickHandler: PropTypes.func.isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  })).isRequired,
};

export default MoviesList;
