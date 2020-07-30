import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import {getActiveMovieTab} from "../../reducer/app-state/selectors.js";
import {checkNavTagretClick} from "../../utils/common.js";
import PropTypes from "prop-types";

const renderTab = (tab, activeTab) => {
  const activeClass = activeTab === tab ? `movie-nav__item--active` : 0;
  const tabClass = `movie-nav__item ${activeClass}`;

  return (
    <li
      key={tab}
      className={tabClass}>
      <a
        className="movie-nav__link"
        data-item={tab}
      >
        {tab}
      </a>
    </li>
  );
};
const MovieNav = (props) => {
  const {tabs, activeTab, onTabItemClick} = props;
  return (
    <nav
      className="movie-nav movie-card__nav"
      onClick={(evt) => {
        evt.preventDefault();
        const tab = checkNavTagretClick(evt.target, activeTab);
        onTabItemClick(tab);
      }}
    >
      <ul className="movie-nav__list">
        {tabs.map((tab) => renderTab(tab, activeTab))}
      </ul>
    </nav>
  );
};

MovieNav.propTypes = {
  onTabItemClick: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeTab: getActiveMovieTab(state)
});

const mapDispatchToProps = (dispatch) => ({
  onTabItemClick(tab) {
    dispatch(ActionCreator.changeMovieTab(tab));
  }
});

export {MovieNav};
export default connect(mapStateToProps, mapDispatchToProps)(MovieNav);
