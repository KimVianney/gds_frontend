import { combineReducers } from "redux";
import authReducer from "../auth";
import userReducer from "../user";
import popUpReducer from "../application";
import sessionReducer from "../session";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  application: popUpReducer,
  session: sessionReducer,
});
