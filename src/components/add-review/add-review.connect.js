import AddReview from "./add-review.jsx";
import {Operation as ReviewOperations} from '../../reducer/review/review.js';
import {getPending, getError} from "../../reducer/review/selectors.js";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return ({
    pending: getPending(state),
    error: getError(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(id, data) {
    dispatch(ReviewOperations.postComment(id, data));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
