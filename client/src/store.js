// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import authReducer from './slices/authSlice';

// const reducer = combineReducers({
//     authState: authReducer
// });

// const store = configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";
import detailReducer from "./slices/detailSlice";
import accordionReducer from "./slices/accordionSlice";
import gridReducer from "./slices/gridSlice";

// Combine reducers
const reducer = combineReducers({
  authState: authReducer,
  userState: userReducer,
  adminState: adminReducer,
  detailState: detailReducer,
  accordion: accordionReducer,
  grid: gridReducer,
});

// Configure store
const store = configureStore({
  reducer,
  // `thunk` is included by default, so you only need this if you're adding other custom middleware.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
