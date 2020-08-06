import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

import PrivateRoute from "./private-route.jsx";

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
