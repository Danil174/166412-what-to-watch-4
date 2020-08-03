import PlayerPage from "./player-page.jsx";
import {connect} from "react-redux";

import {getFilmByID} from "../../reducer/data/selectors.js";

const mapStateToProps = (state, props) => {
  return ({
    film: getFilmByID(props.match.params.id, state),
  });
};

export {PlayerPage};
export default connect(mapStateToProps)(PlayerPage);
