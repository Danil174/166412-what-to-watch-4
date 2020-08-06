import {connect} from "react-redux";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors.js";
import UserBlock from "./user-block.jsx";

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);
