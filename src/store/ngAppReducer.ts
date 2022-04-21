import { INgSocket } from 'types/ngSocket';

interface NgAppState {
  rootSocket: INgSocket | null;
  viewSocket: INgSocket | null;
}

export enum NgAppActionsTypes {
  INITIALIZE_ROOT_SOCKET = 'INITIALIZE_ROOT_SOCKET',
  SET_VIEW_SOCKET = 'SET_VIEW_SOCKET',
}

interface InitializeSocketAction {
  type: string;
  payload: INgSocket;
}

export type NgAppAction = InitializeSocketAction;

const initialState: NgAppState = { rootSocket: null, viewSocket: null };

const ngAppReducer = (state: NgAppState = initialState, action: NgAppAction) => {
  switch (action.type) {
    case NgAppActionsTypes.INITIALIZE_ROOT_SOCKET: {
      return {
        ...state,
        rootSocket: action.payload,
      };
    }
    case NgAppActionsTypes.SET_VIEW_SOCKET: {
      return {
        ...state,
        viewSocket: action.payload,
      };
    }
    default:
      return state;
  }
};

export const initializeRootSocket = (rootSocket: INgSocket): InitializeSocketAction => ({
  type: NgAppActionsTypes.INITIALIZE_ROOT_SOCKET,
  payload: rootSocket,
});

export const setViewSocket = (viewSocket: INgSocket): InitializeSocketAction => ({
  type: NgAppActionsTypes.INITIALIZE_ROOT_SOCKET,
  payload: viewSocket,
});

export default ngAppReducer;
