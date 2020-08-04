import AddReview from "./add-review.jsx";
import {Operation as ReviewOperations} from '../../reducer/review/review.js';
import {getPending, getError} from "../../reducer/review/selectors.js";
import {connect} from "react-redux";


import {getFilmByID} from "../../reducer/films/selectors.js";

const mapStateToProps = (state, props) => {
  return ({
    film: getFilmByID(props.computedMatch.params.id, state),
    pending: getPending(state),
    error: getError(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(id, data) {
    dispatch(ReviewOperations.postComment(id, data));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
