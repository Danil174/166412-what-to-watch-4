import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pointedCard: null,
    };

    this.onCardHoverHandler = this.onCardHoverHandler.bind(this);
  }

  onCardHoverHandler(evt) {
    const element = evt.target.parentElement;

    if (element.tagName !== `ARTICLE` || this.state.pointedCard === element) {
      return;
    }

    this.setState({
      pointedCard: element
    });
  }

  render() {
    const {filmsList, onTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {filmsList.map((film, index) => (
          <SmallMovieCard
            key={index + film.title}
            film={film}
            onCardHoverHandler={this.onCardHoverHandler}
            onFilmTitleClick={onTitleClick}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  filmsList: PropTypes.array.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
