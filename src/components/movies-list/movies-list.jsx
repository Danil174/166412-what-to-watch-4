import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pointedCard: null,
    };

    this.onCardMouseEnterHandler = this.onCardMouseEnterHandler.bind(this);
    this.onCardMouseLeaveHandler = this.onCardMouseLeaveHandler.bind(this);
  }

  onCardMouseEnterHandler(id) {
    this.setState({
      pointedCard: id
    });
  }

  onCardMouseLeaveHandler() {
    this.setState({
      pointedCard: null
    });
  }

  render() {
    const {filmsList, onTitleOrImgClickHandler} = this.props;
    return (
      <div className="catalog__movies-list">
        {filmsList.map((film) => (
          <SmallMovieCard
            key={film.id}
            film={film}
            onTitleOrImgClickHandler={onTitleOrImgClickHandler}
            onCardMouseEnter={this.onCardMouseEnterHandler}
            onCardMouseLeave={this.onCardMouseLeaveHandler}
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
