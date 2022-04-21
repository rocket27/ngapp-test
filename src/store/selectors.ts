import { RootState } from './rootReducer';

export const selectRootSocket = (state: RootState) => state.ngApp.rootSocket;

export const selectViewSocket = (state: RootState) => state.ngApp.viewSocket;
