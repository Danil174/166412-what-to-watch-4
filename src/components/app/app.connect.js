import {connect} from "react-redux";
import {getLoadingStatus, getFilms} from "../../reducer/films/selectors.js";
import App from "./app.jsx";

const mapStateToProps = (state) => ({
  loading: getLoadingStatus(state),
  films: getFilms(state),
});

export {App};
export default connect(mapStateToProps)(App);
