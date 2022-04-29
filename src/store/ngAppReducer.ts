import { ActionObject, ViewItem } from 'types';
// import { INgSocket } from 'types/ngSocket';

interface NgAppState {
  // rootSocket: INgSocket | null;
  // viewSocket: INgSocket | null;
  connectedToRootSocket: boolean | null;
  currentView: ViewItem | null;
}

export const NgAppActionsTypes = {
  // INITIALIZE_ROOT_SOCKET = 'INITIALIZE_ROOT_SOCKET',
  // SET_VIEW_SOCKET = 'SET_VIEW_SOCKET',
  SET_CONNECTION_STATUS: 'ngAppReducer/SET_CONNECTION_STATUS',
  SET_CURRENT_VIEW: 'ngAppReducer/SET_CURRENT_VIEW',
} as const;

// type InitializeSocketAction = ActionObject<INgSocket>;
type SetConnectionStatusAction = ActionObject<boolean>;
type SetCurrentViewAction = ActionObject<ViewItem>;

// export type NgAppAction = SetConnectionStatusAction;

const initialState: NgAppState = {
  // rootSocket: null,
  // viewSocket: null,
  connectedToRootSocket: false,
  currentView: null,
};

const ngAppReducer = (state: NgAppState = initialState, action: ActionObject<any>): NgAppState => {
  switch (action.type) {
    // case NgAppActionsTypes.INITIALIZE_ROOT_SOCKET: {
    //   return {
    //     ...state,
    //     rootSocket: action.payload,
    //   };
    // }
    // case NgAppActionsTypes.SET_VIEW_SOCKET: {
    //   return {
    //     ...state,
    //     viewSocket: action.payload,
    //   };
    // }
    case NgAppActionsTypes.SET_CONNECTION_STATUS: {
      return {
        ...state,
        connectedToRootSocket: action.payload,
      };
    }
    case NgAppActionsTypes.SET_CURRENT_VIEW: {
      return {
        ...state,
        currentView: action.payload,
      };
    }
    default:
      return state;
  }
};

// export const initializeRootSocket = (rootSocket: INgSocket): InitializeSocketAction => ({
//   type: NgAppActionsTypes.INITIALIZE_ROOT_SOCKET,
//   payload: rootSocket,
// });

// export const setViewSocket = (viewSocket: INgSocket): InitializeSocketAction => ({
//   type: NgAppActionsTypes.INITIALIZE_ROOT_SOCKET,
//   payload: viewSocket,
// });

export const setConnectionStatus = (payload: boolean) => ({
  type: NgAppActionsTypes.SET_CONNECTION_STATUS,
  payload,
});

// export const setCurrentView = (payload: ViewItem): SetCurrentViewAction => ({
//   payload,
//   type: NgAppActionsTypes.SET_CONNECTION_STATUS,
// });

export const setCurrentView = (payload: ViewItem) => {
  return {
    type: NgAppActionsTypes.SET_CURRENT_VIEW,
    payload,
  };
};

export default ngAppReducer;
