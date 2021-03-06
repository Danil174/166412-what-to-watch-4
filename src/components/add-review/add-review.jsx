import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute, LoadErrorsTexts, REVIEW_OPTIONS} from "../../const.js";

import Header from "../header/header.jsx";
import Preload from "../preload/preload.jsx";
import ErrorMessage from "../error-message/error-message.jsx";

const renderRatingControls = (isDisabled, rating, changeRating) => {
  const ratingStarts = [];
  for (let i = 1; i <= 5; i++) {
    const input = (
      <React.Fragment key={`star-${i}`}>
        <input
          className="rating__input"
          id={`star-${i}`}
          type="radio"
          name="rating"
          value={i}
          defaultChecked={i === rating}
          disabled={isDisabled}
          onChange={(evt)=>{
            changeRating(Number(evt.target.value));
          }}
        />
        <label className="rating__label" htmlFor={`star-${i}`}>{`Rating ${i}`}</label>
      </React.Fragment>
    );
    ratingStarts.push(input);
  }
  return ratingStarts;
};

const AddReview = (props) => {
  const {
    film,
    pending,
    error,
    rating,
    comment,
    onFormSubmit,
    changeRating,
    changeComment,
    blocked,
    isErrorShown,
    onFormChange,
    onOkBtnClick,
    onBlockedBtnClick,
  } = props;

  if (!film) {
    return <Preload />;
  }

  const {
    id,
    title,
    poster,
    cover,
  } = film;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={cover} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.MOVIE_PAGE}/${id}`} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="movie-card__poster movie-card__poster--small">
          <img
            src={poster}
            alt={`${title} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={(evt)=> {
            evt.preventDefault();
            if (!blocked) {
              onFormSubmit(id, {
                rating,
                comment,
              });
            }
          }}
          onChange={()=> {
            onFormChange();
          }}
        >
          <div className="rating">
            <div className="rating__stars">
              {renderRatingControls(pending || isErrorShown, props.rating, changeRating)}
            </div>
          </div>
          {
            isErrorShown &&
            <p className="error__review">
              Длина комментария не менее {REVIEW_OPTIONS.MIN_LENGTH} знаков и не более {REVIEW_OPTIONS.MAX_LENGTH}. <br />У вас: {comment.length} знаков.
              <button
                className="add-review__btn"
                type="button"
                onClick={(evt) => {
                  evt.preventDefault();
                  onOkBtnClick();
                }}
              >
                OK
              </button>
            </p>
          }
          {
            error &&
            <ErrorMessage
              errorStatus={error}
              errorMessage={LoadErrorsTexts.SEND_REVIEW_FAIL}
            />
          }
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={comment}
              onChange={(evt)=> {
                evt.preventDefault();
                changeComment(evt.target.value);
              }}
              disabled={pending || isErrorShown}
            >
            </textarea>
            <div className="add-review__submit">
              {
                !blocked &&
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={pending}
                >
                  {pending ? `Sending...` : `Post`}
                </button>
              }
              {
                blocked &&
                <button
                  className="add-review__btn disabled"
                  type="button"
                  onClick= {(evt) => {
                    evt.preventDefault();
                    onBlockedBtnClick();
                  }}
                >
                 Post
                </button>
              }
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

AddReview.propTypes = {
  isErrorShown: PropTypes.bool.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onOkBtnClick: PropTypes.func.isRequired,
  onBlockedBtnClick: PropTypes.func.isRequired,
  blocked: PropTypes.bool.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }),
  pending: PropTypes.bool.isRequired,
  error: PropTypes.string,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  changeRating: PropTypes.func.isRequired,
  changeComment: PropTypes.func.isRequired,
};

export default AddReview;
