import React from "react";
import PropTypes from "prop-types";

const listItem = (genre, isActive) => {
  const defaultClass = `catalog__genres-item`;
  const activeClass = isActive ? ` catalog__genres-item--active` : ``;
  const itemClass = defaultClass + activeClass;
  return (
    <li
      key={genre}
      className={itemClass}
    >
      <a
        href="#"
        className="catalog__genres-link"
        data-genre={genre}
      >
        {genre}
      </a>
    </li>
  );
};

const checkGenre = (target, oldGenge) => {
  if (target.tagName !== `A` || oldGenge === target.dataset.genre) {
    return oldGenge;
  }

  const genre = target.dataset.genre;

  return genre;
};

const GenresList = (props) => {
  const {genres, onGenreItemClick, activeGenre} = props;

  const listItems = genres.map((genre) => {
    const isActive = activeGenre === genre;
    return listItem(genre, isActive);
  });

  return (
    <ul
      className="catalog__genres-list"
      onClick={(evt) => {
        evt.preventDefault();
        const ganre = checkGenre(evt.target, activeGenre);
        onGenreItemClick(ganre);
      }}>
      {listItems}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
};

export default GenresList;
