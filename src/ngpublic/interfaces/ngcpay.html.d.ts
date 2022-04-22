/// <reference path="./include.d.ts"/>;
/// <reference path="./cashin.html.d.ts"/>;
/// <reference path="./cashin.common.d.ts"/>;

/**
 * Доступ к текущему контексту, в котором работает сервис ngcpay <br>
 * Текущий контекст содержит данные общего характера, доступные на всех экранах сервиса <br>
 */
declare interface ICommonSvcModel {
    getContext(): CommonSvcContext;
}

declare interface ICommonSvcEvents {
    /**
     * Отобразить сообщение для клиента
     * @param msg параметры сообщения
     * @returns реакция клиента на сообщение (действие, выбранное из списка msg.actions)
    */
    clientMessage(msg: message.ClientMessage): message.ClientMessageResult;
}

/**
 * Текущий контекст, в котором работает сервис ngcpay
 */
declare type CommonSvcContext = {
    /**
     * Заголовок сервиса. Настраивается и поставляется приложением
     */
    caption:            string;
    /**
     * Текущий выбранный объект (узел меню / услуга / Action-скрипт)
     */
    selectedObject?:    GCPayObject;
}

/**
 * Свойства, общие для различных объектов ngcpay <br>
 * К объектам gcpay относятся: узлы меню (&lt;Group&gt;), услуги (&lt;Utility&gt;), скрипты (&lt;Action&gt;)
 */
declare interface GCPayObject {
    /**
     * Короткое наименование (для визуализации в составе списков - например, в меню, в результатах поиска и т.д.)
     */
    shortName:  string;
    /**
     * Длинное наименование (для визуализации как отдельного объекта - например, в заголовке во время выполнения платежа)
     */
    longName:   string;
    /**
     * URL логотипа
     */
    logo?:      string;
}

/**
 * Описание объекта ngcpay как элемента в составе списка
 */
declare interface ListElement extends GCPayObject {
    /**
    * Порядковый номер элемента в списке (нумерация с 0)
    */
    position: number;
}

declare namespace message {
    /**
     * Параметры сообщения для клиента<br><br>
     * Правила отображения сообшения: <br>
     * Может прийти либо пара id+text, либо только text.  <br>
     * Если пришел только text, необходимо отобразить в точности тот текст, который пришел в этом поле.  <br>
     * Если пришла пара id+text, то text должен интерпретироваться как значение по умолчанию. То есть, можно отобразить либо содержимое text, 
     * либо переопределить текст в зависимости от конкретного значения id. Набор возможных вариантов id известен и описан в файле *strings.xml* пакета ngcpay
     */
    export type ClientMessage = {
        /**
         * Тип сообщения  <br>
         * **message** - "короткое" информационное сообщение. Сообщение небольшой длины, как правило, взятое из языковых файлов сервиса ngcpay.
         * После показа информационного сообщения текущая операция может быть продолжена.  <br>
         * **message-long** - "длинное" информационное сообщение. Может иметь сколь угодно большой размер, рекомендуется отображать как скроллируемое поле  <br>
         * **error** - сообщение об ошибке. Как правило, после сообщения об ошибке текущая операция прерывается.  <br>
         * **custom** - на данный момент не используется  <br>
         */
        type:       EClientMessageType;
        /**
         * Идентификатор сообщения
         */
        id:         string;
        /**
         * Текст сообщения по умолчанию
         */
        text?:      string;
        /**
         * Дополнительная информация (пояснение или расшифровка основного текста)
         */
        addInfo?:   string;
        /**
         * Разрешенные варианты реакции клиента на сообщение
         */
        actions?:   EClientMessageAction[];
    }
    /**
     * Результат отображения сообщения (т.е. выбор клиента, что делать дальше)
     */
    export interface ClientMessageResult {
        result: EClientMessageAction;
    }
}

/**
 * Тип сообщения для клиента
 */
type EClientMessageType = "message" | "message-long" | "error" | "choice" | "custom";
type EClientMessageAction = EStdCancel | "ok" | "retry";


declare namespace addressDb {
    /**
     * API доступа к штатной базе данных городов и улиц (для поиска услуг по адресу)
     */
    export interface IAddressDbModel {
        /**
         * Запрос списка городов
         */
        getCities(filter: GetCitiesParam): Cities|IResultDescr;
        /**
         * Запрос списка улиц <br>
         * Возвращается весь список найденных улиц, либо его часть, в зависимости от параметров
         */
        getStreets(filter: GetStreetsParam): Streets|IResultDescr;
    }

    /**
     * Параметры запроса города/списка городов <br>
     * Для поиска используется либо код, либо название города. Приоритет - у кода. <br>
     * Если не указано ничего, возвращается полный список доступных городов
     */
    export interface GetCitiesParam {
        /**
         * Код города в системе КЛАДР
         */
        cityCode?: string;
        /**
         * Название города
         */
        cityName?: string;
    }
    /**
     * Список городов
     */
    export interface Cities {
        items: CityItem[];
    }
    export interface CityItem {
        /**
         * Код города (для передачи в websocket сообщениях)
         */
        code: string;
        /**
         * Название города (для визуализации или передачи в websocket сообщениях)
         */
        name: string;
    }
    /**
     * Параметры поиска улицы
     */
    export interface GetStreetsParam {
        /**
         * Код города. <br>
         * Если не указан, ищутся улицы во всех городах, имеющихся в базе
         */
        cityCode?:  string;
        /**
         * Название или часть названия улицы. <br>
         * Интерпретируется как подстрока в названии улицы, по правилам SQL-конструкции LIKE
         */
        name?:      string;
        /**
         * Порядковый номер элемента, начиная с которого нужно вернуть результаты поиска <br>
         * Нумерация с 0. Значение по умолчанию =0, то есть возвращаются найденные элементы, начиная с самого первого
         */
        position?:  number;
        /**
         * Максимальное количество элементов, которое нужно вернуть <br>
         * Если не указан - возвращаются все элементы, начиная с <i>position</i> и до конца списка
         */
        count?:     number;
    }
    /**
     * Список улиц
     */
    export interface Streets {
        items: string[];
    }

    /**
     * Данные введенного клиентом адреса 
     */
    export type AddressData = {
        /**
         * Название города
         */
        city?:      string;
        /**
         * Код города
         */
        cityCode?:  string;
        street:     string;
        house:      string;
        flat:       string;
    }
}

/**
 * Работа с персональным списком услуг
*/
declare namespace personal {

    export interface IListModel {
        /**
        * Онлайн-запрос персонального списка услуг в ЦУП <br>
        * Актуально для sngle-page режима, где в одной и той же экранной форме вводятся параметр поиска, выполняется запрос списка и его отображение
        */
        requestFromHost(params: HostRequestParams): ActionResult;
        /**
         * Запрос порции полученного персонального списка услуг <br>
         * К моменту подачи данной команды список должен быть уже получен из ЦУП
         * @param p параметры порции
        */
        getItems(p: ListParams): UtilityList;
        /**
         * Выбор клиентом услуги из списка
         * @param position порядковый номер элемента в персональном списке (см. <i>personal.Utility</i>)
        */
        select(position: number): void;
    }

    export interface IListModelEvents {
        /**
         * Запрос от сервиса на ввод адреса
         */
        requestAddress(): RequestAddressResult;
        /**
         * Запрос от сервиса на отображение персонального списка (список к моменту выполнения запроса уже получен из ЦУП)<br/>
         * Услуги из списка могут быть получены запросом **personal.IListModel.getItems**
         */
        showList(): ActionResult;
    }

    /**
     * Параметры для запроса персонального списка услуг
     */
    export type HostRequestParams = {
        method:     string;
        systemId?:  string;
        authType:   string;
        params?:    AdditionalParams;
    }
    
    export type RequestAddressResult = ActionResult & {
        data?: addressDb.AddressData;
    }

    /**
     * Параметры порции персонального списка услуг
     */
    export interface ListParams extends ListSection {
        /**
         * Список дополнительных параметров по каждой из услуг. <br>
         * Может быть использован для визуализации дополнительной информации по услугам
         */
        params?:    string[];
    }
    export interface UtilityList {
        /**
         * Список найденных услуг
         */
        items: Utility[];
    }
    /**
     * Информация об услуге из персонального списка
     */
    export interface Utility extends ListElement {
        /**
         * Идентификатор услуги в ЦУП
         */
        id:         string;
        /**
         * Номер счета абонента
         */
        account:    string;
        /**
         * ФИО абонента
         */
        fio?:       string;
        /**
         * Адрес абонента
         */
        address?:   string;
        /**
         * Долг/переплата абонента по данной услуге
         */
        debtAmount: number;
        /**
         * Цифровой ISO код валюты, в которой оплачивается услуга
         */
        curCode:    string;
        /**
         * Дополнительные параметры (см. <i>personal.ListParams</i>)
         */
        params?:    StringMap;
    }

    export interface StringMap {
        [index: string]: string;
    } 
    export interface AdditionalParams {
        [index: string]: HostRequestParam;
    }
    export type HostRequestParam = number | string | boolean;
}


declare namespace devices {
    /**
     * Интерфейс управления асинхронным устройством
     */
    export interface IStartStopModel {
        /**
         * Асинхронный запуск устройства <br/>
         * (для карт-ридера: перейти в режим ожидания карты)
         */
        start(): void;
        /**
         * Асинхронный останов устройства <br/>
         * (для карт-ридера: выйти из режима ожидания карты)
         */
        stop(): void;
    }
    /**
     * Нотификации от асинхронного устройства
     */
    export interface IStartStopEvents {
        /**
         * Работа устройства (карт-ридера) завершена
         * @param result Результат работы устройства
         */
        done(result: WaitDeviceResult): void;
    }
    /**
     * Результат работы асинхронного устройства
     */
    export type WaitDeviceResult = ActionResult;
}

declare namespace cashin {
    export interface IAppModel {
        /**
         * Получить контекст текущей операции внесения наличных <br>
         * Достаточно запросить один раз перед началом операции
         */
        getContext(): Context;
    }

    /**
     * Прикладные сообщения, генерируемые сервисом ngcpay в процессе внесения наличных
     */
    export interface IAppModelEvents {
        /**
         * Изменился прикладной статус операции внесения наличных
         * @param newStatus новый статус
         */
        appStatusChanged(newStatus: AppStatus): void;
    }

    export type Context = CommonSvcContext & {
        /**
         * Валюта текущей операции <br>
         * В рамках одной операции разрешен прием купюр только одной валюты, указанной в данном поле
         */
        currency:           string;
        /**
         * Рекомендованная сумма операции <br>
         * В минимальных единицах валюты
         */
        recommendAmount?:   number;
        /**
         * Ограничения на сумму принимаемых наличных <br>
         * Предназначены в первую очередь для визуализации клиенту <br>
         * При необходимости проверку внесенной суммы следует делать через вызов [[ICashinModel.validate]]
         */
        restrictions?:      AmountRestrictions;
    }

    /**
     * Прикладной статус операции внесения наличных
     */
    export type AppStatus = {
        /**
         * Валюта внесения (цифровой ISO код)
         */
        currency:           string;
        /**
         * Общая сумма операции с учетом комиссии<br/>
         * Может отличаться от общей суммы внесенных наличных (Для платежей с фиксированной суммой)
         */
        totalAmount:        number;
        /**
         * Текущая сумма комиссии, рассчитанная сервисом
         */
        commissionAmount?:  number;
        /**
         * Текущая сумма операции
         */
        operAmount:         number;
        /**
         * Признак возможности совершить операцию на текущую внесенную сумму<br/>
         * Может использоваться, например, для определения видимости кнопки "Завершить приём"
         */
        canFinish?:         boolean;
        /**
         * Если операция на текущую внесенную сумму не может быть совершена - то здесь передается текст для клиента с описанием причины (например, превышение лимита)
         */
        rejectMessage?:     string;
    }
}


declare namespace menu {
    /**
     * Запросы информации о меню и действия с меню (браузер -> приложение)
     */
    export interface IMenuModel {
        /**
         * Первоначальная инициализация меню
         * @param   id  Идентификатор меню
         * @returns     Верхний уровень запрошенного меню
         */
        init(id: MenuId): Node;
        /**
         * Получить список(часть списка) элементов меню/подменю
         * @param section   Параметр, определяющий, какая часть списка элементов запрашивается
         * @returns         Список элементов меню/подменю
         */
        getItems(section: MenuSection): MenuItems;
        /**
         * Выбрать элемент из указанного меню/подменю
         * @param item  Данные для идентификации элемента
         */
        select(item: MenuItemId): ActionResult;
        /**
         * Вернуться в указанном меню на один уровень вверх
         * @param menuId    Идентификатор меню
         */
        up(menuId?: string): void;
    }

    export interface IMenuModelEvents {
        /**
         * Изменился текущий узел меню (сообщение приходит после выбора вложенного подменю или возврата на уровень вверх)
         */
        nodeChanged(newNode: Node): void;
        /**
         * Работа с меню завершена.
         */
        finished(menuId?: string): void;
    }

    /**
     * Данные для идентификации меню
     */
    export interface MenuId {
        /**
         * Идентификатор меню из конфигурации ngcpay (атрибут Id элемента <Group>)
         */
        id?:    string;
        /**
         * 
         */
        alias?: Alias;
    }
    export type Alias = "top";

    export interface Node {
        id:             string, 
        alias?:         string,
        parentId?:      string;
        caption:        string,
        itemsCount:     number,
        position:       number,
    }
    export interface MenuItem extends ListElement {
        type: "node" | "action" | "utility";
    }
    export interface MenuItems {
        items: MenuItem[];
    }
    export interface MenuSection extends ListSection {
        id: string;
    }
    /**
     * Данные для идентификации элемента в меню
     */
    export interface MenuItemId {
        /**
         * Идентификатор меню
         */
        menuId?:    string,
        /**
         * Порядковый номер элемента в текущем подменю, нумерация начинается в 0
         */
        position:   number;    
    }
}

declare namespace search {
    /**
     * Интерфейс к сервису поиска услуг в локальной конфигурации ngcpay
     */
    export interface ISearchModel {
        /**
         * Запустить новую процедуру поиска по указанным критериям
         * @param conditions Критерии поиска
         */
        start(conditions: SearchConditions): void;
        /**
         * Выбрать элемент из результатов поиска
         * @param item Позиция выбранного элемента в списке результатов
         */
        select(item: ItemId): void;
        /**
         * Сбросить результаты последнего поиска
         */
        reset(): void;
        /**
         * Получить список (или порцию списка) найденных объектов
         */
        getItems(param: ListSection): SearchItems;
    }
    export interface ISearchModelEvents {
        /**
         * Поиск завершен
         * itemsCount - количество найденных объектов
         */
        done(): {itemsCount: number};
    }
    export interface SearchConditions {
        text: string;
    }
    export interface SearchItems {
        items: ListElement[];
    }
    export interface ItemId {
        position: number;
    }
}

declare namespace payment {

    export interface IPaymentModel {
        /**
         * Валидация суммы платежа (для безналичных операций)
         * @param value - сумма, подлежащая валидации, в валюте текущего платежа
        */
        validatePayAmount({value: number}): ValidationResult;
        /**
         * Расчет комиссии для текущего платежа
         * @param amount - сумма, от которой нужно рассчитать комиссию, в валюте текущего платежа
         * @param isFromTotal - true - расчет комиссии вниз от указанной суммы, false - расчет вверх
        */
        calculateCommission({amount: number, isFromTotal: boolean}): payment.Commission|IResultDescr;
        /**
         * Запрос информации об ограничениях на сумму текущего платежа
         */
        getAmountRestrictions(): AmountRestrictions|IResultDescr;
    }

    export interface IPaymentModelEvents {
        /**
         * Информационное сообщение, отправляется перед началом выполнения платежа
         */
        started(): void;
        /**
         * Информационное сообщение, отправляется после завершения платежа
         */
         done(): void;
        /**
         * Запрос выбора платежного инструмента
         * @param payTypes Список платежных инструментов, доступных для текущей услуги
         */
        selectPayType(payTypes: PayTypes): SelectPayTypeResult;
        /**
         * Запрос на отображение информации о тарифах
         * @param t Информация о тарифах
        */
        requestConfirmTariffs(t: ConfirmTariffsContext): ConfirmResult;
        /**
        * Запрос на редактирование изменяемого поля (только для полей с атрибутом IsReadOnly=false)
        * @param field Описание поля
        */
        requestField(field: fields.Editable<fields.TypedField>): fields.EditResult;
         /**
         * Отобразить фиксированное значение поля клиенту (только для полей с атрибутом IsReadOnly=true)
         * @param field Описание поля
        */
        showField(field: fields.TypedField): fields.ShowResult;
        /**
         * Запрос суммы операции для безналичного платежа
        */
        requestPayAmount(p: RequestAmountContext): RequestAmountResult;
        /**
         * Запрос на внесение наличных
        */
        insertCash(): InsertCashResult;
        /**
         * Запрос подтверждения операции у клиента
        */
        requestConfirmPayment(t: ConfirmPaymentDetails): ConfirmResult;
    }

    export type InsertCashResult = {
        ok: boolean;
    }

    /**
     * Результат выбора платежного инструмента
     */
    export type SelectPayTypeResult = {
        /**
         * Выбор клиента (продолжить/отменить опаерацию)
         */
        result: EStdChoice;
        /**
         * Выбранный платежный инструмент<br/>
         * (актуально только для result == 'ok')
         */
        value?:  EPayType;
    }
    /**
     * Список разрешенных платежных инструментов
     */
    export type PayTypes = {
        items: EPayType[];
    }
    /**
     * Варианты платежных инструментов, поддерживаемые сервисом ngcpay <br>
     * <b>cash</b> - оплата наличными <br>
     * <b>card</b> - безналичная оплата с использованем платежной карты <br>
     * <b>account</b> - безналичная оплата со счёта в банке <br>
     */
    export type EPayType = "cash"|"card"|"account";

    export type RequestAmountContext = {
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

    export type RequestAmountResult = {
        result: "ok"|"cancel"|"timeout";
        value?: number;
    }

    export type ConfirmTariffsContext = {
        /**
         * Валюта совершения операции
         */
        currency:   string;
        /**
         * Признак комиссия/ИТО <br>
         * true - ИТО, false - комиссия
         */
        isIto:      boolean;
        /**
         * Список тарифов
         */
        tariffs:    Tariff[];
    }

    /**
     * Информация о взимаемом тарифе
     */
    export type Tariff = {
        /**
         * Наименование тарифа
         */
        title?:     string;
        /**
         * Процентная часть тарифа <br>
         * Измеряется в сотых долях процента <br>
         * &gt;0 - данный тариф является процентным <br>
         *  0 - процентная часть отсутствует, тариф фиксированный
         */
        percent:    number;
        /**
         * Для процентного тарифа - минимальная сумма комиссии <br>
         * Для фиксированного тарифа - сумма тарифа <br>
         */
        feeMin?:    number;
        /**
         * Для процентного тарифа - максимальная сумма комиссии <br>
         * Для фиксированного тарифа - не используется
         */
        feeMax?:    number;
        /**
         * Минимальная сумма операции, начиная с которой взимается данный тариф <br>
         */
        amountMin?: number;
        /**
         * Максимальная сумма операции, до которой взимается данный тариф<br>
         */
        amountMax?: number;
    }

    /**
     * Данные операции для подтверждения клиентом
     */
    export type ConfirmPaymentDetails = {
        currency:   string;
        payType:    EPayType;
        amounts?:   ConfirmPaymentAmounts;
        useIto?:    boolean;
        /**
         * Список полей услуги
         */
        fields:         fields.TypedField[];
        /**
         * Список допустимых вариантов действий для клиента
         */
        actions?:       EConfirmPaymentAction[];

        srcCard?:       string;
        srcAccount?:    string;
    }
    export type ConfirmPaymentAmounts = {
        operAmount:     number;
        fineAmount?:    number;
        commission?:    number|CommissionItem[];
        totalAmount?:   number;
    }
    export type CommissionItem = {
        title: string;
        value: number;
    }

    /**
    * Результат подтверждения операции клиентом
    */
    export type ConfirmResult = {
        result: EConfirmPaymentAction;
    }
    type EConfirmPaymentAction = EStdChoice | "retry" | "add-to-templates";

    /**
    * Результат расчета комиссии
    */
     export type Commission = {
        payAmount:          number;
        commissionAmount:   number;
        totalAmount:        number;
    }
}

/**
* Интерфейс к полям услуги в процессе выполнения платежа
*/
declare namespace fields {

    export type TypedField = TextField|AmountField|DateField|MonthField|Combobox|Checkbox|StringField;

    export type Editable<Field> = Field & {
        /**
        * Поясняющее описание к полю для клиента
        */
         hint:   string;
    }

    /**
     * Запросы расширенной информации о текущем поле (сообщения браузер -> приложение)
     */
    export interface IFieldModel {
        /**
         * Валидация указанного значения (применяются правила для текущего поля)
         * Валидация обязательно должна быть выполнена перед завершением редактирования
         * Завершать редактирование можно только после успешной валидации
         * 
         * @param value Валидируемое значение
         * @returns Результат проверки
         */
        validate(value: string): ValidationResult;
        /**
         * Запрос списка допустимых значений (только для поля с типом "combobox")
         * 
         * @param p Параметр, определяющий, что нужно вернуть:<br/> 
         * ListSection - список значений (или часть списка)<br/>
         * ListKey - конкретный элемент по указанному идентификатору
         * @returns Список значений (для параметра ListKey возвращается список из одного значения)
         */
        getListItems?(p: ListSection|ListKey): ListItems|IResultDescr;
    }

    /**
     * Общие параметры для всех полей
    */
    export type BasicField = {
        /**
        * Идентификатор поля в услуге
        */
        id:     string;
        /**
         * Тип клиентского интерфейса поля 
        */
        type:   EControlType;
        /**
         * Логический тип поля (см. <DataType> в xml конфигурации) 
        */
        dataType: EDataType;
        /**
        * Название поля для клиента
        */
        title: string;
    }

    /**
     * Тип данных поля
    */
    type EControlType = "text"|"amount"|"date"|"month"|"checkbox"|"combobox"|string;

    /**
     * Логический тип поля (см. <DataType> в xml конфигурации)
    */
     type EDataType = "simple"|"orderSum"|"totalSum"|"debtSum"|"account"|"srcAccount"|"pccIdent"|"clientId"|"lkPhone";

    /**
     * Поле со строковым типом данных
    */
     export type StringField = BasicField & {
        /**
         * Значение поля (неформатированное)
         */
        value:  string;
    }

    /**
     * Поле с логическим типом данных
    */
     export type BooleanField = BasicField & {
        value: boolean;
    }
    /**
     * Поле с ControlType=amount
     */
    export type AmountField = BasicField & {
        type:       "amount";
        /**
         * Значение суммы в минимальных единицах валюты
         */
        value:      number;
        /**
         * Валюта суммы (цифровой ISO код)
         */
        currency:   string;
    }
    /**
     * Текстовое поле с маской (ControlType не указан)
     */
    export type TextField = StringField & {
        type:   "text";
        /**
         * Маска редактирования поля
         */
        mask:   string;
    }
    /**
     * Поле с ControlType=date
     * Значение в обе стороны передается в формате yyyy-mm-dd
     */
    export type DateField = StringField & {
        type: "date";
    }
    /**
     * Поле с ControlType=month
     * Значение в обе стороны передается в формате yyyy-mm
     */
    export type MonthField = StringField & {
        type: "month";
    }
    /**
     * Поле с ControlType=checkbox
     */
    export type Checkbox = BooleanField & {
        type: "checkbox";
    }
    /**
     * Поле с ControlType=combobox
     */
    export type Combobox = BasicField & {
        type:       "combobox";
        value:      ListItem;
        /**
         * Количество элементов в выпадающем списке.
         * Сами элементы могут быть получены запросом *ngcpay.field.getListItems*
         */
        itemsCount: number;
    }

    /**
     * Список значений для поля с типом "combobox"
     */
    export interface ListItems {
        items: ListItem[];
    }
    /**
     * Идентификатор элемента в списке значений поля "combobox"
     */
    type ListKey = string;

    /**
    * Результат демонстрации клиенту readonly-поля
    */
    export interface ShowResult {
        /**
        * Действие клиента (продолжить/отменить)
        */
        result: EStdChoice;
    }

    /**
     * Результат редактирования клиентом изменяемого поля
     */
    export interface EditResult {
        /**
         * Действие клиента (продолжить/отменить)
         */
        result: EStdChoice;
        /**
         * Введенное/выбранное клиентом значение
         * Актуально только для result == "ok"
         */
        value?: string|boolean|number;
    }
}

/**
 * Базовый тип для извлечения части списка
 * position - индекс первого извлекаемого элемента (нумерация с 0), по умолчанию - 0
 * count    - количество извлекаемых элементов, по умолчанию - извлечь все элементы до конца списка
 */
declare interface ListSection {
    position?:  number;
    count?:     number;
}

/**
 * Базовый тип для представления отдельного элемента списка<br/>
 * id       - идентификатор элемента, предназначен для передачи в технических сообщениях<br/>
 * text     - название элемента, предназначено для визуализации клиенту
 */
 declare interface ListItem {
    id:     string;
    text:   string;
}

declare type SimpleChoice = "ok"|"cancel";

declare type SimpleResult = {
    result: SimpleChoice;
}

