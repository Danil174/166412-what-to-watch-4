import React from "react";
import {Link} from "react-router-dom";
import Footer from "../footer/footer.jsx";

const NotFound = () => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">
          404.
          <br />
          <small>Page not found</small>
        </h1>
      </header>

      <div className="user-page__content">
        <Link className="page-title user-page__title" to="/">Go to main page</Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
