import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
// import storage from "redux-persist/lib/storage";

const initalState = {};
const persistConfig = {
  key: "app-store",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger();

const middleware = [thunk, loggerMiddleware];
const store = createStore(
  persistedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let persistor = persistStore(store);
export { store, persistor };
