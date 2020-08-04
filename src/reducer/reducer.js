import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as user} from "./user/user.js";
import {reducer as films} from "./films/films.js";
import {reducer as review} from "./review/review.js";
import {reducer as appState} from "./app-state/app-state.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.APP_STATE]: appState,
  [NameSpace.REVIEW]: review,
});
