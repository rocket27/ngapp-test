/// <Reference path="./include.d.ts"/>;

declare interface ICoreValidationOut{
  ok:boolean;
  msg?:string;
}

declare interface ICoreValidationIn{
  amount:number;
  curCode:string;
}

declare interface ICashoutModel  { //NgHtmlInterface
    /**
     * Получить текущий контекст для операции выдачи наличных.
     */
    getContext(): IResultDescr | IGetContextOut | Promise<IGetContextOut>;

    /**
     * Получить информацию по валюте.
     * @param i - валюта
     */
    getCurrencyInfo(i: IGetCurrencyInfoIn):  IResultDescr | IGetCurrencyInfoOut | Promise<IGetCurrencyInfoOut>;
    
    /**
     * Проверить возможность выдачи данный суммы по лимитам устройства.
     * @param i
     */
    coreValidateAmount(i:ICoreValidationIn): IResultDescr | ICoreValidationOut | Promise<ICoreValidationOut>;

    /**
     * Начать операцию выдачи наличных, присылаемые события смотри в ICashoutEventsOut
     * @param i
     */
    startTransaction(i:IStartTransactionIn): IResultDescr | IStartTransactionOut | Promise<IStartTransactionOut>;

    /**
     * Вычислить комиссию.
     * @param i
     */
    calculateCommission(i: ICalculateCommissionIn): IResultDescr | ICalculateCommissionOut | Promise<ICalculateCommissionOut>;

    /**
     * Произвести расчет или проверку раскладки выдаваемой суммы по кассетам
     * @param i
     */
    denominate(i: IDispenseData): IResultDescr | IWithdDenominateOut | Promise<IWithdDenominateOut>;
}

declare type  StringOut = string;

declare interface IHtmlCore  { //NgHtmlInterface
    ng_getStr(i:StringOut):StringOut;
}

type OK = "ok";
type YES_NO = "yes"|"no";
type YES_NO_EXIT =  "yes"|"no"|"exit";

/**
 * Событие возникаеющие при выполнении метода startTransaction.
 */
declare interface ICashoutEventsOut  { //NgHtmlEvents
    /**
     * Полное имя события "ngcashout.confirm"
     * Подтверждение выполнения операции с реквизитами операции
     * @param i
     * @return "yes" -операция разрешена, "no"-операция запрещена.
     */
    confirm(i: IConfirm): Promise<(YES_NO)>;

    /**
     * Полное имя события "ngcashout.print_receipt"
     * Запрос на печать чека.
     * @return "yes" - Продолжить с печатью чека чека, "no"-Продолжить без печати чека, "exit" - завершить операцию.
     */
    print_receipt(): Promise<(YES_NO_EXIT)>;

    /**
     * Выполняющий шаг операции.
     *
     * @param i - шаг операции, возможно следующие id событий
     * STEP_TAKE_CARD_ON,
     * STEP_TAKE_CARD_OFF
     * STEP_TAKE_RECEIPT
     * STEP_DISPENSE
     * STEP_MONEY_OFFER
     * STEP_MONEY_TAKEN
     * STEP_MONEY_LEFT
     * STEP_MONEY_PRESENT_ERROR
     * @return - ответ не требуется.
     */
    msg_step(i:IMessage):Promise<void>;

    /**
     * Сообщение об ошибке.
     *
     * STEP_SHOW_TRAN_AUTH_STATUS
     * MSG_CARD_RETAINED
     * MSG_OPER_DECLINED
     * @param i - "ok" - сообщение прочитано.
     */
    msg_error(i: IError): Promise<OK>;
}


declare interface IWithdDenomination {
    value:  number;
    count:  number;
}

declare enum EDenomType{
    one = 1,
    two = 2
}

declare interface IDispenseData {
    /**
     * @pattern ^\d\d\d$
     */
    curCode:    string;
    /** 
     * @type integer  
     * @minimum 0
    */
    amount?:    number;
    denom?:     IWithdDenomination[];
    denomMode?: "minnotes"|"equal"|"propor"; 

}
interface IMessage{
    /**
     * id сообщения
     */
    str_id:string;

    /**
     * Текст сообщения.
     */
    text:string;
}

declare interface IStartTransactionIn extends  IDispenseData{
}

declare interface IStartTransactionOut {
    rc:number;
}

declare interface IGetContextOut {
    curList:        string[];
    isCdmReady:     boolean;
}

declare interface IGetCurrencyInfoIn {
    curCode: string;
}
declare interface IGetCurrencyInfoOut {
    curCode:        string;
    restrictions:   IRestrictions;
    denominations:  IWithdDenomination[];
    fastCash:       number[];
    maxDispNotes:   number;
}
declare interface IRestrictions {
    /** 
     * @type integer  
     * @minimum 0
    */
   maxAmount:   number;
}

declare interface ICalculateCommissionIn {
    /** 
     * @type integer  
     * @minimum 0
    */
    amount:     number;
    curCode:    string;
}

declare interface ICalculateCommissionOut{
    amount:       number;
    total:        number;
    commission:   number;
    curCode:      string;
}

declare interface IWithdDenominateOut {
    /**
     * Результат выполнения операции
     */
    rc:                 number;  
    /**
     * Сумма к выдаче.
     */
    amount?:            number;   
    /**
     * раскладка по Номиналам.
     */
    denominations?:     IWithdDenomination[];
    /**
     * раскладка по кассетам.
     */
    denomData?:         number[];
    /**
     * В случае ошибки, ближайшие суммы.
     */
    availableAmounts?:  number[];
}

declare interface IConfirm {
    curCode:            string;
    operAmount:         number;
    commissionAmount:   number;    
}

declare interface IError {
    id?:    string;
    text:   string;
}
