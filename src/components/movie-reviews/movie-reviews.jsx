import React from "react";
import PropTypes from "prop-types";
import {Months} from "../../const.js";

const renderComment = (comment) => {
  const {userID, userName, text, rating, date} = comment;
  const prittydate = `${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return (
    <div
      key={`${userID}${date}`}
      className="review">
      <blockquote className="review__quote">
        <p className="review__text">{text}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime="2016-12-24">{prittydate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

const MovieReviews = (props) => {
  let {comments} = props;

  const secondPart = comments.splice(0, comments.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {comments.map((it) => renderComment(it))}
      </div>
      <div className="movie-card__reviews-col">
        {secondPart.map((it) => renderComment(it))}
      </div>
    </div>
  );
};

MovieReviews.propTypes = {
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
