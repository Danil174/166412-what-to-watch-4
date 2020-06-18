import React from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

const titleClickHandler = () => {};

const App = (props) => {
  const {releaseDate, filmGenre, films} = props;
  return (
    <Main
      date={releaseDate}
      genre={filmGenre}
      filmsList = {films}
      onTitleClick={titleClickHandler}
    />
  );
};

App.propTypes = {
  releaseDate: PropTypes.number.isRequired,
  filmGenre: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
};


export default App;
