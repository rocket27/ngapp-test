import { INgSocket } from 'ngpublic/interfaces/ngsocket';
import { GlobalNgSocket } from './ngSocket';

export type CustomWindow = Window & GlobalNgSocket;

export interface ActionObject<P> {
  type: string;
  payload: P;
}

export enum ViewScreenIds {
  WAITING_SCREEN = 'ngstart.waitingscreen',
  PLEASE_WAIT = 'ngstart.pleasewait',
  ENTER_PIN = 'ngcore.enterpin',
  SHOW_TAKE_CARD = 'ngcore.showtakecard',
}

export interface ViewItem {
  args: any;
  ngSocket: INgSocket;
  viewId: string;
}
