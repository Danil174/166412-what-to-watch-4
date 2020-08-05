import Main from "./main.jsx";
import {connect} from "react-redux";

import {getGenres, getFilmsByGenre} from "../../reducer/films/selectors.js";
import {getPromoFilm, getloadPromoError} from "../../reducer/data/selectors.js";
import {getActiveGenre} from "../../reducer/app-state/selectors.js";
import {ActionCreator} from '../../reducer/app-state/app-state.js';

const mapStateToProps = (state) => ({
  activeGenre: getActiveGenre(state),
  films: getFilmsByGenre(state),
  genres: getGenres(state),
  promoFilm: getPromoFilm(state),
  loadPromoError: getloadPromoError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeFilter(genre));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
