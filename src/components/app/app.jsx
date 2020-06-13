import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  const {releaseDate, filmGenre, films} = props;
  return (
    <Main
      date={releaseDate}
      genre={filmGenre}
      filmsList = {films}
    />
  );
};


export default App;
