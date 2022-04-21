import { useEffect, useState } from 'react';
import { CustomWindow, ViewScreenIds } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { selectRootSocket, selectViewSocket } from 'store/selectors';
import { setViewSocket } from 'store/ngAppReducer';
import EnterPin from 'components/enterPin';

export default function Main() {
  const dispatch = useDispatch();
  const rootSocket = useSelector(selectRootSocket);
  const viewSocket = useSelector(selectViewSocket);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(
      setViewSocket(
        (window as unknown as CustomWindow).ngCreateViewSocket(ViewScreenIds.WAITING_SCREEN)
      )
    );
  }, [dispatch]);

  useEffect(() => {
    rootSocket?.on('ng_showView', ({ id }: { id: string }) => {
      console.log('Main rootSocket onShowView', id);
      if (id === ViewScreenIds.WAITING_SCREEN) {
        viewSocket?.onActivate((args: any) => {
          console.log('viewSocket onActivate', args);
        });
        viewSocket
          ?.request('ngstart.getMenu', { type: 'waitScreen' })
          .then((res: any) => console.log(res));
        viewSocket?.on('ng_setUrl', (s: any) => console.log('ng_setUrl', s));
        viewSocket?.on('ng_showView', (a: { id: string }) => {
          console.log('viewSocket onShowView', a);
        });
      }
      if (id === ViewScreenIds.ENTER_PIN) {
        setOpen(true);
      }
    });
  }, [rootSocket, viewSocket]);

  return (
    <div>
      <h1>Это стартовая страница приложения</h1>
      <p>Она же является аналогом Waiting Screen demo SPA приложения</p>
      <p>
        Страница отображает для пользователя информацию о том что нужно вставить или приложить карту
      </p>
      <p>
        Мы пробуем ожидать этого события со стороны сокета, но его не происходить когда вставляем
        карту в эмуляторе
      </p>
      <p>
        Ниже описан пример компонента модального окна для ввода пин кода, который хотим отображать
        по событию ngcore.enterpin, которое не происходит ((
      </p>
      {open && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-modal">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-96 h-80 rounded-2xl border border-black p-4">
            <EnterPin />
          </div>
        </div>
      )}
    </div>
  );
}
