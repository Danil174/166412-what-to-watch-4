import MyList from "./my-list.jsx";
import {connect} from "react-redux";
import {Operation} from "../../reducer/my-list/my-list.js";
import {getMyList, getLoadingStatus, getMyListError} from "../../reducer/my-list/selectors.js";

const mapStateToProps = (state) => {
  return ({
    myFilms: getMyList(state),
    loadStatus: getLoadingStatus(state),
    error: getMyListError(state),
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchMyList() {
    dispatch(Operation.loadMyList());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
