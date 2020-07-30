import React from "react";
import PropTypes from "prop-types";
import {checkNavTagretClick} from "../../utils/common.js";

const listItem = (genre, activeGenre) => {

  const activeClass = activeGenre === genre ? `catalog__genres-item--active` : ``;
  const itemClass = `catalog__genres-item ${activeClass}`;

  return (
    <li
      key={genre}
      className={itemClass}
    >
      <a
        href="#"
        className="catalog__genres-link"
        data-item={genre}
      >
        {genre}
      </a>
    </li>
  );
};

const GenresList = (props) => {
  const {genres, onGenreItemClick, activeGenre} = props;

  return (
    <ul
      className="catalog__genres-list"
      onClick={(evt) => {
        evt.preventDefault();
        const ganre = checkNavTagretClick(evt.target, activeGenre);
        onGenreItemClick(ganre);
      }}>
      {genres.map((ganre) => listItem(ganre, activeGenre))}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
};

export default GenresList;
