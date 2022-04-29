import { INgSocket } from 'ngpublic/interfaces/ngsocket';
import { CustomWindow } from 'types';

export function exitView(ngSocket: INgSocket | undefined, ret: string, param?: string) {
  ngSocket?.send('ng_exitView', { ret, param: param || '' });
}

export function getViewSocket(viewId: string): INgSocket {
  return (window as never as CustomWindow).ngCreateViewSocket(viewId);
}
