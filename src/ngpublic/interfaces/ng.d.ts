
declare interface ISetContext{
    name:"lang"|"contrast";
    value:string;
}


/** Текущий контекст пользовательского интерфейса */
interface AppInfoContext {
    /** Язык интерфейса */
    lang:string;
    /** Графическая тема (скин) */
    skin:string;
    /** Признак наличия контрастного интерфейса */
    contrast:string;
}

interface ISize {
    width:number;    
    height:number;    
}

/** Настройки GUI */
interface AppInfoGuiSettings {
    /** Разрешение экрана */
    screenResolution:ISize;
    /**
    * Координаты расположения середины функциональных клавиш.
    * Единицы указаны в процентах по отношению к разрешению по вертикали.
    * Самая верхняя позиция  - 0 %
    * <ul>                
    * <li>fdkY[0] - F1 и F5 
    * <li>fdkY[1] - F2 и F6
    * <li> ...
    * </ul>
    * 
    */
    fdkY:number[];
    /** Признак наличия сенсорного экрана */
    isTouch:boolean;
}

/** Модель денежной суммы */
declare interface IMoney {
    /** Сумма */
    value:number;
    /** Валюта */
    curCode:string;
}

/** Информация о внесенных деньгах */
interface ICashinInfo{
    /** Остаток внесенных денег в устройстве */
    balance: IMoney;
}   

/** Информация о состоянии приложения */
declare interface GetAppInfoOut{
        /** ID терминала */
        termName:string;
        /** Режим работы приложения (true - банкомат, false - терминал) */
        isAtm:boolean;
        /** Статус диспенсера (0 - Ок.) */
        cdmStatus:number;
        /** Статус бесконтактного ридера (0 - Ок.) */
        ccrStatus:number;
        /** Статус ридера карт (0 - Ок.) */
        iduStatus:number;
        /** Статус cashin     (0 - Ок.) */
        cashinStatus:number;
        /** Статус ключей ВПС (0 - Ок.) */
        epsKeyStatus:number;
        /** Статус принтера   (0 - Ок.) */
        printerStatus:number; 
        /** Таймаут на диалог в секундах */
        dialogTimeout:number;
        /** Текущий контекст */
        context:AppInfoContext;
        /** Настройки GUI */
        guiSettings:AppInfoGuiSettings;
        /** Время отображения на экране сообщения "Возьмите чек" (в секундах) */
        clientCheckDelay:number;
        /** Информация о внесенных деньгах */
        cashinInfo:ICashinInfo;
  }


/**
 * Результат завершения представления
 * @property ret    код возврата
 * @property param  дополнительные данные, в зависимости от ret
 */
/*
interface ExitViewIn {
    ret:    "RET_OK"|"RET_CANCEL"|"RET_EXEC"|"RET_NEXT"|"RET_CASH"|"RET_ERROR";
    param:  string;   // дополнительные данные.
 }
*/ 



/**
* Именованная величина
* @property name имя запрошенных данных
* @property value значение запрошенных данных
*/
interface INameValue {
    name:string;
    value:string;
 }
 




declare interface EndDialogIn {
    ret:string;
    param:string;
}


/**
 * Для корректной работы эмулятора EPP, необходимо
 * @param key нажатая клавиша "A".."Z", "Enter", "Escape"
 */
declare function ng_emuKeyPressed(key:string):void;

/**
 *  сборс таймера watchdog на представлении. Величина таймера задается в appconf.json в параметре htmlWatchdogTimeout
 *  Если по истечении заданного времени, из представления не будет совершено никакого запроса или не будет вызвана эта функци.
 *  В менеджер представления придёт команда на закрытие view.
 */
declare function ng_resetTimer():void;

/**
 *  Установка текущих клиентских настроек. Необходимо для MPA для передачи настроек между
 *  разными представлениями.
 * @param p текущие настройки.
 */
declare function ng_setContext(p:ISetContext):void;

/** Получить актуальную информацию из приложения */
declare function ng_getAppInfo():GetAppInfoOut;

/** завершить выполнение представления */
declare function ng_exitView(param:EndDialogIn):void;

/**
 * Спецификация на обратботчик события ng_eppKeyEvent, получение нажатую клавишу из EPP
 * @param key - нажатая клафиша "0".."9", "Enter", "Cancel", "Escape", "Backspace"
 */
declare function ng_eppKeyEvent(key:string):void;

/**
 * Спецификация на обратботчик события ng_eppSecKeyEvent, получение нажатую клавишу из EPP
 * @param key - нажатая клафиша "0".."9", "Enter", "Cancel", "Escape", "Backspace"
 */
declare function ng_eppSecKeyEvent(key:string):void;

