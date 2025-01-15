import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import todosReducer from "./slices/todoSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["todosState"],
};

const rootReducer = combineReducers({
  todosState: todosReducer,
});

export { rootPersistConfig, rootReducer };
