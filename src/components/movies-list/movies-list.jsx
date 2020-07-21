import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {LoadErrorsTexts} from "../../const.js";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import ErrorMessage from "../error-message/error-message.jsx";
import withActiveVideo from "../../hocs/with-active-video/with-active-video.js";

const SmallMovieCardWrapper = withActiveVideo(SmallMovieCard);

class MoviesList extends PureComponent {
  render() {
    const {filmsList, onTitleOrImgClickHandler, loadFilmsError} = this.props;
    return (
      loadFilmsError ?
        <ErrorMessage
          errorStatus={loadFilmsError}
          errorMessage={LoadErrorsTexts.LIST_FAIL}
        /> :
        <div className="catalog__movies-list">
          {filmsList.map((film) => (
            <SmallMovieCardWrapper
              key={film.id}
              film={film}
              onTitleOrImgClickHandler={onTitleOrImgClickHandler}
            />
          ))}
        </div>
    );
  }
}

MoviesList.propTypes = {
  loadFilmsError: PropTypes.number,
  onTitleOrImgClickHandler: PropTypes.func.isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  })).isRequired,
};

export default MoviesList;
