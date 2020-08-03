import React from "react";
import {Link} from "react-router-dom";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {AppRoute} from "../../const.js";

const NotFound = () => {
  return (
    <div className="user-page">
      <Header withError={true} userPage={true} />

      <div className="user-page__content">
        <Link to={AppRoute.ROOT} className="page-title user-page__title">Go to main page</Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
