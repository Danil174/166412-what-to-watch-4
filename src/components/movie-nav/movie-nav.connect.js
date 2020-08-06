import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import {getActiveMovieTab} from "../../reducer/app-state/selectors.js";
import MovieNav from "./movie-nav.jsx";

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
