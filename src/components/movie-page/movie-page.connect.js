import MoviePage from "./movie-page.jsx";
import {connect} from "react-redux";

import {getActiveMovieTab} from "../../reducer/app-state/selectors.js";
import {getComments} from "../../reducer/data/selectors.js";
import {getFilms, getFilmByID, getLoadingStatus} from "../../reducer/films/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation, ActionCreator} from '../../reducer/data/data.js';

const mapStateToProps = (state, props) => {
  return ({
    comments: getComments(state),
    authorizationStatus: getAuthorizationStatus(state),
    activeTab: getActiveMovieTab(state),
    films: getFilms(state),
    currentFilm: getFilmByID(props.match.params.id, state),
    loading: getLoadingStatus(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  componentMounted(id) {
    dispatch(DataOperation.loadComments(id));
  },
  componentUnmounted() {
    dispatch(ActionCreator.deleteComments());
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
