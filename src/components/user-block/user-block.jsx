import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../const.js";

import Avatar from "../avatar/avatar.jsx";

const SignIn = () => {
  return (
    <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
    // <Redirect to={AppRoute.LOGIN} className="user-block__link">Sign in</Redirect>
    // <a href={AppRoute.LOGIN} className="user-block__link">Sign in</a>
  );
};

const UserBlock = (props) => {
  const {authorizationStatus, userData} = props;
  const {avatarUrl} = userData;

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? <Avatar url={avatarUrl} /> : <SignIn />
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),
};

export default UserBlock;
