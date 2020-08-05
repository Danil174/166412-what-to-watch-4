import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../const.js";

import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

const ErrorMessage = () => {
  return (
    <div className="sign-in__message">
      <p>We can’t recognize this email <br /> and password combination. Please try again.</p>
    </div>
  );
};

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const {onFormSubmit} = this.props;

    const authData = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    };

    onFormSubmit(authData);
  }

  render() {
    const {loginError} = this.props;
    const errorClass = loginError ? `sign-in__field--error` : ``;
    const fieldClasses = `sign-in__field ${errorClass}`;

    if (this.props.authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <div className="user-page">
        <Header userPage={true} />

        <div className="sign-in user-page__content">
          <form
            action="#"
            className="sign-in__form"
            ethod="post"
            onSubmit={this._handleSubmit}
          >
            {loginError && <ErrorMessage />}
            <div className="sign-in__fields">
              <div className={fieldClasses}>
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.emailRef}
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this.passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

SignIn.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
};

export default SignIn;
