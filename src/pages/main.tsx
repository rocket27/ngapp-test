import { useEffect, useState } from 'react';
import { ViewItem } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { getViewSocket } from 'helpers';
import EnterPin from 'components/enterPin';
import { selectConnectedStatus, selectCurrentView } from 'store/selectors';
import { setConnectionStatus, setCurrentView } from 'store/ngAppReducer';
import rootSocket from 'rootSocket';
import PleaseWait from 'components/pleaseWait';

function WaitingScreen() {
  // const [ngStartModel, setNgStartModel] = useState<NgStartModel>(new NgStartModel(ngSocket));

  return (
    <>
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
    </>
  );
}

function createComponent(obj: ViewItem) {
  function get() {
    switch (obj.viewId) {
      case 'ngstart.pleasewait':
        return <PleaseWait {...obj} />;
      case 'ngstart.waitingscreen':
        return <WaitingScreen />;
      case 'ngcore.enterpin':
        return <EnterPin {...obj} />;
      default:
        return <WaitingScreen />;
    }
  }

  return <div key={obj.viewId}>{get()}</div>;
}

export default function Main() {
  const dispatch = useDispatch();
  const connectedStatus = useSelector(selectConnectedStatus);
  const currentView = useSelector(selectCurrentView);
  const [view, setView] = useState<JSX.Element | undefined>(undefined);

  useEffect(() => {
    console.log(`Current view is ${currentView?.viewId}`);
  }, [currentView]);

  useEffect(() => {
    rootSocket.onConnected(() => {
      console.log('Connected to root socket');
      dispatch(setConnectionStatus(true));
    });
    rootSocket.onDisconnected(() => {
      dispatch(setConnectionStatus(false));
      console.log('Disconnected from root socket');
      setView(undefined);
    });

    //  на ng_createView создаем NgSocket соответсвующий запрошенному id
    rootSocket.on('ng_createView', ({ id }: { id: string }) => {
      const ngSocket = getViewSocket(id);

      // вешаем на onActivate получение аргументов, и если необходимо делаем что то длительное.
      ngSocket.onActivate(async (args) => {
        console.log(`Create view ${id} with args ${JSON.stringify(args)}`);
        dispatch(setCurrentView({ viewId: id, ngSocket, args }));
      });
    });
  }, [currentView, dispatch]);

  useEffect(() => {
    rootSocket.on('ng_showView', ({ id }: { id: string }) => {
      console.log(`showView ${id} ${JSON.stringify(currentView)}`);

      if (!currentView) return;

      const createdView = createComponent({
        viewId: currentView.viewId,
        ngSocket: currentView.ngSocket,
        args: currentView.args,
      });

      setView(createdView);
    });
  }, [currentView]);

  return (
    <div>
      {!connectedStatus && (
        <div>
          <b>Не работает!</b>
          <br />
          <br />
        </div>
      )}
      {connectedStatus && view && view}
    </div>
  );
}
