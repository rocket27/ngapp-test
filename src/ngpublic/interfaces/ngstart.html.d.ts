/// <Reference path="menu.public.d.ts"/>;
/// <Reference path="include.d.ts"/>;
// /// <Reference path="../../ngstart/public/init.conf.d.ts"/>;

type GetScreenPlayOut = IScreenPlayMedia[];
type GetMenuOut=Menu.IMenu ;
type GetMenuIn=MenuRequestIn;

/** Параметры предустановленной операции */
declare interface  PreselectedUrlIn {
    /** Ссылка на операцию согласно протоколу GSR */
    url: string;
}

/** Результат выполнения операции */
declare interface IRetExecUrl {
    /** Значение, которое должно вернуть при завершении текущее представление */
    ret   : string;
    /** Параметры завершения представления (если ret не пустое)  */
    param?: string;
}

/**
 * Модель, используемая для представлений cardScreen и waitingScreen.
 */
declare interface  IStartModel  { //NgHtmlInterface
    /**
     * Установить выбранную операцию, в случае если будет вставленна карта.
     * @param param - входные данные.
     */
    setPreselectedUrl(param:PreselectedUrlIn):void;

    /**
     * Запросить текущее меню, для представления ожидания или для вставленной карты
     * @param menuReqParam
     */
    getMenu(menuReqParam:GetMenuIn):GetMenuOut|Promise<GetMenuOut>|IResultDescr;

    /**
     * Получить список проигрываемых медиа файлов из GSR
     */
    getScreenPlay(): Promise<GetScreenPlayOut> | GetScreenPlayOut | IResultDescr ;

    /**
     * Получить установленный в конфигурации пароль на вход в сервисное меню.
     * Представление должно самостоятельно, согласно дизайну и соображениям безопастности, реализовать проверку пароля 
     * или нажатий на определённые области экрана
     */
    eppOperPassword(): string | IResultDescr|Promise<string>;

    /**
     * Запустить запрошенную операцию.
     * @param url - ссылка на операцию согласно протоколу GSR,
     * @returns  Обычно метод возвращает объект [[IRetExecUrl]] с пустым ret-свойством
     * Если ret не пустое, то представление должно выполнить exitView с параметрами [[IRetExecUrl]]
     * Пример :
     *
     *```
     * let obj:IRetExecUrl = executeUrl(url);
     * if(obj.ret) {
     *    ngUi().exitView(obj.ret,obj.param)
     * }
     *
     *```
     */
    executeUrl(url:string):IRetExecUrl|Promise<IRetExecUrl>;
}


/**
 * IHtmlOutOfService - модель, используемая для представления outOfService.
 */
declare  interface  IOutOfServiceModel  { //NgHtmlInterface
    /**
     * Получить установленный в конфигурации пароль, на вход в сервисное меню.
     * Представление должно самостоятельно, согласно дизайну и соображениям безопастности, реализовать проверку пароля,
     * или нажатий на определённые области экрана
     */
    eppOperPassword(): string | IResultDescr;
}

/** Сообщение об ошибке (описаны в strings.xml) */
declare interface IShowErrorData{
    /** Идентификатор */
    id:string;
    /** Текст сообщения */
    text:string;
}

/** Предупреждение об остатке денежных средств */
declare interface IShowCashRemind{
    /** Текст предупреждения */
    text:string;
}