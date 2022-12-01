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
import participantReducer from '../features/participant/participantSlice';
import staff_managementReducer from '../features/staff_management/staff_managementSlice';
import user_managementReducer from '../features/user_management/user_managementSlice';
import profileReducer from '../features/profile/profileSlice';
import backupReducer from '../features/backup/backupSlice';

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
  participant: participantReducer,
  staff_management: staff_managementReducer,
  user_management: user_managementReducer,
  profile: profileReducer,
  backup: backupReducer
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
