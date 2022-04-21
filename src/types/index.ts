import { GlobalNgSocket } from './ngSocket';

export type CustomWindow = Window & GlobalNgSocket;

export enum ViewScreenIds {
  WAITING_SCREEN = 'ngstart.waitingscreen',
  PLEASE_WAIT = 'ngstart.pleasewait',
  ENTER_PIN = 'ngcore.enterpin',
  SHOW_TAKE_CARD = 'ngcore.showtakecard',
}
