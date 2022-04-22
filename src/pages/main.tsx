import { useEffect, useState } from 'react';
import { CustomWindow, ViewScreenIds } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { selectRootSocket, selectViewSocket } from 'store/selectors';
import { setViewSocket } from 'store/ngAppReducer';
import EnterPin from 'components/enterPin';
import {INgSocket} from "../types/ngSocket";
import {ngappmodel} from "../ngpublic/lib/ngappmodel";
import {NgStartModel} from "../ngpublic/lib/NgStartModel";

interface ViewProps {
  viewId:string;
  ngSocket:INgSocket;
  args:any;
}

function exitView(ngSocket:INgSocket|undefined, ret:string, param?:string){
  ngSocket?.send("ng_exitView", {ret: ret, param: param?param:""});
}
function EnterPinModal(props:ViewProps){
  const [pin, setPin] = useState("");

  function onKeyDown(e: KeyboardEvent) {
    ngappmodel.sendEmuKey(props.ngSocket, e.key);
  }

  function onEppKeyEvent (key:string) {
    console.log("onEppKeyEvent() key=" + key+" "+pin);
    switch(key) {
      case "PIN_entered":
        exitView(props.ngSocket, "RET_OK");
        break;
      case "PIN_canceled":
        exitView(props.ngSocket, "RET_CANCEL");
        break;
      case "Clear":
        setPin("");
        break;
      case "Backspace":
        console.log("PIN:"+pin+" "+pin.slice(0, -1));
        setPin(p=>(p.length==0?p:p.slice(0, -1)));
        break;
      default:
        if(key.length == 1){
          setPin(p=>p+"*");
        }

    }
  }

  useEffect(()=>{
    // только для отладки с эмулятором. в реальном банкомате не нужно и не будет работать.
    document.addEventListener("keydown", onKeyDown);
    props.ngSocket.on("ng_eppSecKeyEvent",onEppKeyEvent);
    return ()=>{
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [])

  return (
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-modal">
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-96 h-80 rounded-2xl border border-black p-4">
          <input type="text" value={pin} readOnly/>
        </div>
      </div>
  )
}

function PleaseWait(props:ViewProps){
  useEffect(()=>{
    setTimeout(_=>{
      exitView(props.ngSocket, "RET_OK")
    },300);
  }, []);

  return (
      <div>Please Wait</div>
  )
}

function WaitingScreen(props:ViewProps){
  const [ngStartModel, setNgStartModel] = useState<NgStartModel>(new NgStartModel(props.ngSocket))

  return (<>      <h1>Это стартовая страница приложения</h1>
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
  </>)
}

function createComponent(obj:ViewProps){
  function get() {
    switch(obj.viewId) {
      case "ngstart.pleasewait":
        return <PleaseWait {...obj}/>
      case "ngstart.waitingscreen":
        return <WaitingScreen {...obj}/>
      case "ngcore.enterpin":
        return <EnterPinModal  {...obj}/>
    }
  }

  return (
      <div key={obj.viewId}>
        {get()}
        <hr/>
      </div>
  )

}

interface ViewItem{
  viewId:string;
  ngSocket:INgSocket;
  args?:any;
}

let curView:ViewItem|undefined = undefined;

export default function Main() {
  const dispatch = useDispatch();

  const rootSocket = useSelector(selectRootSocket);
  const [view, setView] = useState<JSX.Element|undefined>(undefined);
  const [connected, setConnected] = useState(false);


  useEffect(() => {

    rootSocket?.onConnected(() => {
      setConnected(true);
      console.log('Connected to root socket')});

    rootSocket?.onDisconnected(() => {
      setConnected(false);
      console.log('Disconnected from root socket')
        setView(undefined);
      }
    );


    //  на ng_createView создаем NgSocket соответсвующий запрошенному id
    rootSocket?.on("ng_createView", ({id}:{id:string})=>{
      let ngSocket = (window as unknown as CustomWindow).ngCreateViewSocket(id);
      // вешаем на onActivate получение агрументов, и если необходимо делаем что то длительное.
      ngSocket.onActivate(async (args)=>{

        // нужна синхронная альтернатива curView useState не обновляется уже при вызове showView!
        console.log(`Create view ${id} with args ${JSON.stringify(args)}`);
        curView   = {viewId:id, ngSocket:ngSocket, args:args};
      })

    });

    rootSocket?.on('ng_showView', ({ id }: { id: string }) => {
      console.log(`showView ${id} ${JSON.stringify(curView)}`);

      // Временно поставить "!" не охото правильно расставлять типизацию
      let view = createComponent({
        viewId:curView!.viewId,
        ngSocket:curView!.ngSocket,
        args:curView?.args});

      console.log(view);
      setView(view);
    });
  }, []);

  return (
    <div>
      {!connected&&<div><b>Не работает!</b><br/><br/></div>}
      {view}
    </div>
  );
}
