import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const Mock = {
  RELEASE_DATE: 2014,
  GENRE: `Drama`
};

ReactDOM.render(
    <App
      films={films}
      releaseDate={Mock.RELEASE_DATE}
      filmGenre={Mock.GENRE}
    />,
    document.querySelector(`#root`)
);
