import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getLoginError} from '../../reducer/user/selectors.js';

import SignIn from "./sign-in.jsx";

const mapStateToProps = (state) => ({
  loginError: getLoginError(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(authData) {
    dispatch(UserOperation.login(authData));
  }
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
