import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Mock = {
  RELEASE_DATE: 2014,
  GENRE: `Drama`
};

ReactDOM.render(
    <App
      releaseDate={Mock.RELEASE_DATE}
      filmGenre={Mock.GENRE}
    />,
    document.querySelector(`#root`)
);
