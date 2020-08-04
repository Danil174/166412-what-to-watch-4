import React from "react";
import {Link} from "react-router-dom";
import Header from "../header/header.jsx";
import {AppRoute} from "../../const.js";
import Preload from "../preload/preload.jsx";

const renderRatingControls = (pending) => {
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
          defaultChecked={i === 3}
          disabled={pending}
        />
        <label className="rating__label" htmlFor={`star-${i}`}>{`Rating ${i}`}</label>
      </React.Fragment>
    );
    ratingStarts.push(input);
  }
  return ratingStarts;
};

const AddReview = (props) => {
  console.log(props);
  const {film, pending, error, onSubmit} = props;

  if (!film) {
    return <Preload />;
  }

  const {
    id,
    title,
    poster,
    cover,
  } = film;

  let formClasses = `add-review__form`;

  if (pending) {
    formClasses += ` add-review__form--disabled`;
  }

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
          className={formClasses}
          onSubmit={(evt)=> {
            evt.preventDefault();
            const data = new FormData(evt.target);
            console.log(data);
            // onSubmit(id, data);
          }}
        >
          <div className="rating">
            <div className="rating__stars">
              {renderRatingControls(pending)}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"

              minLength={50}
              maxLength={400}
              disabled={pending}
            >
            </textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={pending}
              >
                {pending ? `Sending...` : `Post`}
              </button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

export default AddReview;
