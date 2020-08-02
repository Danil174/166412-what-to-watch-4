import React from "react";
import PropTypes from "prop-types";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";

const Header = (props) => {
  const {withError, userPage} = props;
  const className = userPage ? `page-header user-page__head` : `page-header movie-card__head`;
  return (
    <header className={className} >
      <Logo isLight={false} />
      {
        withError ?
          <h1 className="page-title user-page__title">
            404.
            <br />
            <small>Page not found</small>
          </h1>
          :
          <div className="user-block">
            <UserBlock />
          </div>
      }
    </header>
  );
};

Header.propTypes = {
  userPage: PropTypes.bool,
  withError: PropTypes.bool
};

export default Header;
