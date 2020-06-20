import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";
// import film from "./mocks/film.js";

const Mock = {
  RELEASE_DATE: 2014,
  GENRE: `Drama`
};

ReactDOM.render(
    <App
      // film={film}
      films={films}
      releaseDate={Mock.RELEASE_DATE}
      filmGenre={Mock.GENRE}
    />,
    document.querySelector(`#root`)
);
