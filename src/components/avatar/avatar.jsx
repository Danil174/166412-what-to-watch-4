import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const Avatar = (props) => {
  const {url} = props;
  const src = `https://htmlacademy-react-3.appspot.com${url}`;

  return (
    <Link to={AppRoute.MY_LIST}>
      <div className="user-block__avatar">
        <img src={src} alt="User avatar" width="63" height="63" />
      </div>
    </Link>
  );
};

Avatar.propTypes = {
  url: PropTypes.string
};

export default Avatar;
