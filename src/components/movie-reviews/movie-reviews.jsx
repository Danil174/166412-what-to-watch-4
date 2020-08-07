import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Months} from "../../const.js";

const renderComment = (comment) => {
  const {userID, userName, text, rating, date} = comment;
  const prittydate = `${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const prittyDateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return (
    <div
      key={`${userID}${date}`}
      className="review">
      <blockquote className="review__quote">
        <p className="review__text">{text}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime={prittyDateTime}>{prittydate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

class MovieReviews extends PureComponent {
  componentDidMount() {
    if (this.props.id) {
      const {componentMounted, id} = this.props;
      componentMounted(id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id || prevProps.id === undefined) {
      const {componentMounted, id} = this.props;
      componentMounted(id);
    }
  }

  componentWillUnmount() {
    this.props.componentUnmounted();
  }

  render() {
    let {comments} = this.props;
    const firstPart = comments.slice();
    const secondPart = firstPart.splice(0, Math.round(comments.length / 2));

    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {secondPart.map((it) => renderComment(it))}
        </div>
        <div className="movie-card__reviews-col">
          {firstPart.map((it) => renderComment(it))}
        </div>
      </div>
    );
  }
}

MovieReviews.propTypes = {
  id: PropTypes.number,
  componentMounted: PropTypes.func.isRequired,
  componentUnmounted: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    commentID: PropTypes.number,
    date: PropTypes.date,
    rating: PropTypes.number,
    text: PropTypes.string,
    userID: PropTypes.number,
    userName: PropTypes.string,
  })).isRequired
};

export default MovieReviews;

