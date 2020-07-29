import React from "react";
import PropTypes from 'prop-types';

const ShowMoreBtn = (props) => {
  const {onShowMoreBtnClick} = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => onShowMoreBtnClick()}
      >
          Show more
      </button>
    </div>
  );
};

ShowMoreBtn.propTypes = {
  onShowMoreBtnClick: PropTypes.func.isRequired,
};

export default ShowMoreBtn;
