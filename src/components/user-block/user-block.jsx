import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {AuthorizationStatus, AppRoute} from "../../const.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

const Avatar = () => {
  return (
    <Link to={AppRoute.FAVORITES}>
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    </Link>
  );
};

const SignIn = () => {
  return (
    <a href={AppRoute.LOGIN} className="user-block__link">Sign in</a>
  );
};

const UserBlock = (props) => {
  const {authorizationStatus} = props;

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? <Avatar /> : <SignIn />
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);
