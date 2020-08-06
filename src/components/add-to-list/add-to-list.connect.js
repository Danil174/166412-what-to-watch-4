import {connect} from "react-redux";
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import AddToList from "./add-to-list.jsx";

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMyListBtnClick(id, isFavorite) {
    dispatch(DataOperation.setFavorite(id, isFavorite));
  }
});

export {AddToList};
export default connect(mapStateToProps, mapDispatchToProps)(AddToList);
