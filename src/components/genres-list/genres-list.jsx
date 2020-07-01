import React from "react";
import PropTypes from "prop-types";

// const activeClass = `catalog__genres-item--active`;

const genreItem = (genre) => {
  // const activeClass = active ? activeClass : ``;
  return (
    <li className="catalog__genres-item">
      <a
        href="#"
        className="catalog__genres-link"
        dataGenreType={genre}
      >
        {genre}
      </a>
    </li>
  );
};

const GenresList = (props) => {
  const {genres, onGenreItemClickHandler} = props;

  return (
    <ul
      className="catalog__genres-list"
      onClick={onGenreItemClickHandler}
    >
      {genres.map((genre) => (
        <genreItem
          key={genre}
          genre={genre}
        />
      ))}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  // selectedGenre: PropTypes.string.isRequired,
  onGenreItemClickHandler: PropTypes.func.isRequired,
};

export default GenresList;
