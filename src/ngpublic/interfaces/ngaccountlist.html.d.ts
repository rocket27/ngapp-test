/// <Reference path="./include.d.ts"/>

declare type ERecType = "unknown"|"opened"|"new";
declare type EpsType  = "MC"|"VS"|"UP"|"MR";
declare type EOperTypeHtml = "info"|"cash"|"cashFromKassa"|"remoteOper"|"card";
declare type EUrsaInterfType =  "none"|"continue"|"continue_or_cancel";

declare interface IAccountHtmlRec {
/**
*
*/
        id    :  string;
/**
*   Номер счета
*/
        numb  :  string;
/**
*   Тип счета. (До востребоания, расчетный)
*/
        type  :  string;
/**
*   Наименование счета
*/
        name  :  string;
/**
*   Состояние счета (существующий счет - 1, вклад для открытия - 2)
*/
        state?   :  ERecType;
/**
* Маска в формате:  XXXXX биты 0,1,2,3,4
* бит 0 - AccType            Тип счета (до востребования - 1, срочный - 2)
* бит 1 - IsCardIsAcc        Наличие привязанной к счету карты (есть - 1, нет - 2)
* бит 2 - IdentificationType Идентификация клиента (осуществлялась по привязанной к данному счету карте - 1, по другой карте - 2)
* бит 3 - IsSalaryAcc        Наличие зарплатного проекта (счет зарплатный - 1, счет не является зарплатным - 2)
* бит 4 - IsCredit           Наличие кредита (есть привязанный в статусе "рабочий" - 1, есть привязанный в статусе, отличном от "рабочий" - 2, нет привязанного кредита - 3)                       mask  :  string;
*/
        mask?          :  string;
/**
*  Дата открытия счета в формате DD.MM.YYYY
*/
        openDate?      :  string;
/**
*  Валюта счета
*/
        cur?           :  string;
/**
*  Дата очередного (ближайшего) платежа по кредиту в формате DD.MM.YYYY
*/
        nextPayDate?   :  string;
/**
* Сумма очередного (ближайшего) платежа по кредиту (в минимальных единицах валюты)
*/
        nextPaySum?    :  number;
/**
* 20-значный номер лицевого счета в маскированном виде (правила маскирования опреде
*/
        maskedAccNum?  :  string;
/**
*  Сумма просроченной задолженности по кредитному продукту (в минимальных единицах валюты)
*/
        balance?       :  number;
/**
*  "Баланс" продукта (в минимальных единицах валюты)
*/
        debt?     :  number;
/**
* Сумма выданного кредита (в минимальных единицах валюты)
*/
        creditSum?:  number;
/**
*  Дата закрытия продукта (дата закрытия счета/вклада)  в формате DD.MM.YYYY
*/
        closeDate? :  string;
/**
*  Платежная система карты, MasterCard, Visam UnionPay, MIR
*/
        eps?      :  EpsType;
/**
* Статус платежа по продукту
*/
        payStatus? :  string;
/**
* Минимальная сумма вклада (в минимальных единицах валюты)
*/
        depMinSum?        :  number;
/**
* Максимальная сумма вклада (в минимальных единицах валюты)
*/
        depMaxSum?        :  number;
/**
* Открываемый вклад может пополняться:
* 1-да,  2-нет, 3-частичное полнение, 4-частичное снятие
*/
        depAvailability?  :  number;
/**
* Ставка по открываемому вкладу (в сотых процентах)
*/
        depRate?          :  number;
/**
* Минимально возможный срок открываемого вклада в днях
*/
        depMinPeriod?     :  number;
/**
* Максимально возможный срок открываемого вклада в днях
*/
        depMaxPeriod?     :  number;
/**
* Возможность капитализации вклада
*/
        depCapitalization? :  boolean;

//        colArr?:string[] ;
}


declare interface IAccountHtmlOper  {
/**
 * id операции.
 */
        id:          string;
/**
 * Для счета доступно частичное пополнение.
 */
        isPartial?   : boolean;
/**
 * Тип операции
 */
        operType?  : EOperTypeHtml;
/**
 * Минимальнпая сумма операции
 */
        minSum :number;
/**
 * максимальная сумма операции
 */
        maxSum :number;
/**
 *   Рекомендованная сумма операции
 */
        recommendSum :number;
/**
* Рекомендованная валюта выбранного счета
*/
        recommendCur:string;
/**
 *   название операции
 */
    buttonText : string;
/**
 * Тариф на совершение операции
 */
    tariff? : ITariff;
}

declare interface ITariff {
    /**
     * сумма взимаемой комиссии
     */
    sum:        number;
    /**
     * валюта комиссии
     */
    curCode:    string;
}


declare interface IAccountHtmlInfo {
   /**
    * Список операций
    */
    operList:IAccountHtmlOper[];
    /**
     * Текст на экране Информация о счете
     *
     */
    scrText?:string;
    /**
     * Текст для печати Информация о счете
     *
     */

    prnText?:string;
}


declare interface ReqAccountInfoIn {
/**
*   Уникальный идентификатор счета
*/
     id:string;
}

declare interface IReqAccountListIn {
    filter:string;
}

declare interface IAccListModel {
/**
*   Запрос списка счетов
*/
    reqAccountList(s:IReqAccountListIn):IAccountHtmlRec[] | IErrorContainer | Promise<IAccountHtmlRec[]|IErrorContainer>;
/**
*   Запрос списка операций по выбранному счету
*/
    reqAccountInfo( l:ReqAccountInfoIn ):IAccountHtmlInfo | IErrorContainer | Promise<IAccountHtmlInfo|IErrorContainer> ;

    /**
    *   Печать текста на чековом принтере
    */
    printData(s:string):void|Promise<void>;

    /**
    *   Совершение выбранной клиентом операции
    */
    startOperation(p: IStartOperation): IOperationResult | IErrorContainer|Promise<IOperationResult|IErrorContainer>;

    /**
    *   Валидация введенной клиентом суммы
    */
    validateAmount(p: IValidateAmount): IValidationResult|Promise<IValidationResult>;

    /**
    *   Запрос у клиента суммы операции
    */


}





declare interface IStartOperation {
    /**
    *   Идентификатор счёта, для которого заказывается операция
    */
    accountId: string;
    /**
    *   Идентификатор операции (действителен в рамках выбранного счёта)
    */
    operId: string;
}

declare interface IOperationResult {
    /**
     * Результат выоплнения операции
     * 0 - успешно
     * < 0 - ошибка или операция отменена
     */
    rc: number;
    /**
     * текст для отображения на экране, при rc < 0 - текст сообщения об ошибке
     */
    screenText?: string;
    /**
     * текст для печати на чеке
     */
    printText?:  string;
}

declare interface IRequestAmount {
    /**
     * Валюта, в которой выполняется текущая операция
     */
    curCode:            string;
    /**
     * Значение суммы по умолчанию (используется как предвведенное)
     */
    defaultValue:       number;
    /**
     * Рекомендованная сумма операции
     */
    recommendedValue?:  number;
    /**
     * Ограничения на сумму операции
     */
    restrictions?:      AmountRestrictions;
}

declare interface IRequestAmountResult {
    result: EStdChoice|"ok";
    value?: number;
}

declare interface IValidateAmount {
    value: number;
}


declare interface IValidationResult {
    ok:         boolean;
    message?:   string;
}

declare interface IConfirmOperation {
    prompt:         string;
    text:           string;
    interfType:EUrsaInterfType;
}

declare interface IConfirmResult {
    result: EConfirmChoice;
}
type EConfirmChoice = EStdChoice | "retry";

declare interface IErrorContainer {
    error: IClientError;
}

declare interface IClientError {
    id?:        string;
    text:       string;
    choices?:   EShowErrorChoice[];
}
type EShowErrorChoice = EStdChoice | "retry" | "cashin";

declare interface IErrorResult {
    choice: EShowErrorChoice;
}

declare interface IAccCashinHtmlInfo  {
    minSum        :  number;
    maxSum        :  number;
    recommendSum  :  number;
    cur           :  string;
    cashinAmount  :  number;
    clientAmount  :  number;
    commission    :  number;
    isDone        :  boolean;
}
