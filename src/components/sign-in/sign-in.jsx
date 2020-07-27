import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getLoginError} from '../../reducer/user/selectors.js';

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

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

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

        <footer className="page-footer">
          <div className="logo">
            <a href="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}


SignIn.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loginError: getLoginError(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(authData) {
    dispatch(UserOperation.login(authData));
  }
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
