import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import authReducer  from '../features/authentication/authSlice';
import episodeReducer from '../features/episode/episodeSlice';
import exerciseReducer from '../features/exercise/exerciseSlice';
import pronunCourseReducer from '../features/pronunciation_course/pronunCourseSlice';
import errorReducer from '../features/error/errorSlice';

const persistConfig = {
  key: 'root',
  version:1,
  storage,
  
}

const reducers = combineReducers({
  admin_auth: authReducer,
  episode: episodeReducer,
  exercise: exerciseReducer,
  pronunciation_course: pronunCourseReducer,
  error: errorReducer,
})

const persistedReducers = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer:persistedReducers,
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
