import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {releaseDate, filmGenre} = props;
  return (
    <Main
      date={releaseDate}
      genre={filmGenre}
    />
  );
};


export default App;
