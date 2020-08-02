import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const Logo = (props) => {
  const className = props.isLight ? `logo__link logo__link--light` : `logo__link`;

  return (
    <div className="logo">
      <Link to={AppRoute.ROOT} className={className}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  isLight: PropTypes.bool.isRequired,
};

export default Logo;
