import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus, AppRoute} from "../../const.js";
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

export default AddToList;
