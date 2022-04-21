import { combineReducers } from 'redux';
import ngAppReducer from './ngAppReducer';

const rootReducer = combineReducers({
  ngApp: ngAppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
