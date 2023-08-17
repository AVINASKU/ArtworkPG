import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from "redux-logger";
//import { createBrowserHistory } from 'history';
import rootReducer from "./store/reducers";

const getMockReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

//export const history = createBrowserHistory();
const loggerMiddleware = createLogger();
// export const middlewares = [thunk, routerMiddleware(history)];
export const middlewares = [thunk, loggerMiddleware];

export const getMockStore = (initialState) => {
  const mockUserReducer = getMockReducer(initialState.UserReducer);
  const mockTaskReducer = getMockReducer(initialState.TaskReducer);
  const mockSSOReducer = getMockReducer(initialState.SSOReducer);
  const mockaccessMatrixReducer = getMockReducer(initialState.accessMatrixReducer)
  //const rootReducer = (his) => combineReducers({
//     const rootReducer = combineReducers({
//     //router: connectRouter(his),
//     user: mockUserReducer,
//     task: mockTaskReducer,
//     SSO: mockSSOReducer,
//     accessMatrixReducer: mockaccessMatrixReducer,
//   });

  const mockStore = createStore(rootReducer, applyMiddleware(...middlewares));
  return mockStore;
};