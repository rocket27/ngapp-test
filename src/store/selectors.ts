import { RootState } from './rootReducer';

// export const selectRootSocket = (state: RootState) => state.ngApp.rootSocket;
// export const selectViewSocket = (state: RootState) => state.ngApp.viewSocket;

export const selectConnectedStatus = (state: RootState) => state.ngApp.connectedToRootSocket;
export const selectCurrentView = (state: RootState) => state.ngApp.currentView;
