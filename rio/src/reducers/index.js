import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import log from "./log";
import opLog from "./opLog";
import facilities from "./facilities";
import movement from "./movement";

export default combineReducers({
  routing: routerReducer,
  log,
  opLog,
  facilities,
  movement
});
