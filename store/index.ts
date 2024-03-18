import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import quizReducer from "./questionReducer";


const localConfig = {
    key: "doc-local-root",
    storage,
};

const localReducer = combineReducers({
    question: quizReducer,
});

const persistedLocal = persistReducer(localConfig, localReducer);


export const store = configureStore({
    reducer: persistedLocal,

});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
