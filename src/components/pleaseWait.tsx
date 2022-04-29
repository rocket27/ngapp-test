import { exitView } from 'helpers';
import { useEffect } from 'react';
import { ViewItem } from 'types';

export default function PleaseWait({ ngSocket }: ViewItem) {
  useEffect(() => {
    setTimeout(() => {
      exitView(ngSocket, 'RET_OK');
    }, 300);
  }, [ngSocket]);

  return <div>Please wait...</div>;
}
