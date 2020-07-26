import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {AuthorizationStatus, AppRoute} from "../../const.js";
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import history from "../../history.js";

const redirectToSignIn = (authorizationStatus, onMyListBtnClick, id, isFavorite) => {
  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    return history.push(AppRoute.LOGIN);
  }
  return onMyListBtnClick(id, isFavorite);
};

const AddToList = (props) => {
  const {authorizationStatus, id, isFavorite, onMyListBtnClick} = props;

  const newFavoriteStatus = !isFavorite ? 1 : 0;

  return (
    <button
      onClick={(evt) => {
        evt.preventDefault();
        redirectToSignIn(authorizationStatus, onMyListBtnClick, id, newFavoriteStatus);
      }}
      className="btn btn--list movie-card__button"
      type="button"
    >
      {
        isFavorite &&
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      }
      {
        !isFavorite &&
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      }
      <span>My list</span>
    </button>
  );
};

AddToList.propTypes = {
  id: PropTypes.number,
  isFavorite: PropTypes.bool,
  onMyListBtnClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMyListBtnClick(id, isFavorite) {
    dispatch(DataOperation.setFavorite(id, isFavorite));
  }
});

export {AddToList};
export default connect(mapStateToProps, mapDispatchToProps)(AddToList);
