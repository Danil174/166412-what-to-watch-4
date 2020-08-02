import React from "react";
import {Link} from "react-router-dom";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

const NotFound = () => {
  return (
    <div className="user-page">
      <Header withError={true} userPage={true} />

      <div className="user-page__content">
        <Link className="page-title user-page__title" to="/">Go to main page</Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
