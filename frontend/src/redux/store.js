import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from './postSlice.js';
import socketSlice from "./socketSlice.js"
import chatSlice from "./chatSlice.js";
import rtnSlice from "./rtnSlice.js";

import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Persist Config
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

// Root Reducer
const rootReducer = combineReducers({
    auth: authSlice,
    post: postSlice,
    socketio: socketSlice, // Manages socket state
    chat: chatSlice,
    realTimeNotification: rtnSlice
})

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure Store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore Redux-Persist actions
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                // Ignore non-serializable paths like socket instance
                ignoredPaths: ['socketio.socket'], // Ignores socket instance
            },
        }),
});

export default store;
