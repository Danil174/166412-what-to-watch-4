
import MovieReviews from "./movie-reviews.jsx";
import {connect} from "react-redux";
import {Operation as DataOperation, ActionCreator} from '../../reducer/data/data.js';


const mapDispatchToProps = (dispatch) => ({
  componentMounted(id) {
    dispatch(DataOperation.loadComments(id));
  },
  componentUnmounted() {
    dispatch(ActionCreator.deleteComments());
  }
});

export {MovieReviews};
export default connect(null, mapDispatchToProps)(MovieReviews);
