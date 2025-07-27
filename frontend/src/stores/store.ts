import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import ordersSlice from "./orders/ordersSlice";
import productsSlice from "./products/productsSlice";
import reviewsSlice from "./reviews/reviewsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
orders: ordersSlice,
products: productsSlice,
reviews: reviewsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
