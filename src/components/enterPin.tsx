import { exitView } from 'helpers';
import { ngappmodel } from 'ngpublic/lib/ngappmodel';
import { useEffect, useState } from 'react';
import { ViewItem } from 'types';

export default function EnterPin({ ngSocket }: ViewItem) {
  const [pin, setPin] = useState<string>('');

  function onKeyDown(e: KeyboardEvent) {
    ngappmodel.sendEmuKey(ngSocket, e.key);
  }

  function onEppKeyEvent(key: string) {
    console.log(`onEppKeyEvent | key = ${key} | pin = ${pin}`);

    switch (key) {
      case 'PIN_entered':
        exitView(ngSocket, 'RET_OK');
        break;
      case 'PIN_canceled':
        exitView(ngSocket, 'RET_CANCEL');
        break;
      case 'Clear':
        setPin('');
        break;
      case 'Backspace':
        console.log(`PIN: ${pin} ${pin.slice(0, -1)}`);
        setPin((p) => (p.length === 0 ? p : p.slice(0, -1)));
        break;
      default:
        if (key.length === 1) {
          setPin((p) => `${p}*`);
        }
    }
  }

  useEffect(() => {
    // только для отладки с эмулятором. в реальном банкомате не нужно и не будет работать.
    document.addEventListener('keydown', onKeyDown);
    ngSocket.on('ng_eppSecKeyEvent', onEppKeyEvent);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-modal">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-96 h-80 rounded-2xl border border-black p-4">
        <input type="text" value={pin} readOnly />
      </div>
    </div>
  );
}
