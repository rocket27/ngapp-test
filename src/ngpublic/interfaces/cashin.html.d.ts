/// <reference path="cashin.common.d.ts"/>;

declare interface ICashInWebSocketModel {
    cashin(cmd: CashInMessage): CashInMessage|undefined;
}

declare type CashInMessage = {
    name:   keyof ICashInModel;
    param:  any;
}

/**
 * События, генерируемые модулем внесения наличных
 */
 declare interface ICashInModelEvents {
    /**
     * Транзакция внесения наличных открыта <br>
     * Справочное сообщение, активных действий со стороны html не требуется
     */
    started?():void;
    /**
     * Изменился статус транзакции внесения наличных <br>
     * Справочное сообщение, активных действий со стороны html не требуется <br>
     * Может использоваться, например, для обновления информации о внесенной сумме
     * @param p Информация о текущем статусе транзакции
     */
    statusChanged?(p: CashIn.StatusChangedIn):void;
    /**
     * Кэшин готов к переходу в режим ожидания вставления купюр <br>
     * Справочное сообщение, активных действий со стороны html не требуется
     */
    readyToInsert?():void;
    /**
     * Кэшин перешел в режим ожидания вставления купюр <br>
     * Возможные команды со стороны html: "cancel", "finish"
     */
    insertStarted?():void;
    /**
     * Режим ожидания завершен, купюры внесены и распознаны (только для пачечников) <br>
     * Возможные команды со стороны html: "resume", "finish", "rollback"
     * @param p Список внесенных купюр
     */
    insertDone?(p: CashIn.InsertDoneIn): void;
    /**
     * Режим ожидания завершен, купюра вставлена и распознана (только для покупюрников) <br>
     * Как правило, активных действий со стороны html не требуется, кэшин автоматически перезапускает режим ожидания купюры
     * @param p Список внесенных купюр
     */
    noteInsertDone?(p: CashIn.InsertNoteDoneIn): void;
    /**
     * Кэшин начал перемещение последней внесенной купюры в кассету (только для покупюрников) <br>
     * Справочное сообщение, активных действий со стороны html не требуется
     */
    noteAcceptStarted?():void;
    /**
     * Купюра успешно перемещена в кассету (только для покупюрников) <br>
     * Справочное сообщение, активных действий со стороны html не требуется
     */
    noteAcceptDone?():void;
    /**
     * Кэшин начал возврат последней внесенной купюры (только для покупюрников) <br>
     * Справочное сообщение, активных действий со стороны html не требуется
     */
    noteRejectStarted?():void;
    /**
     * Последняя внесенная купюра возвращена клиенту (только для покупюрников) <br>
     * Справочное сообщение, активных действий со стороны html не требуется
     */
    noteRejectDone?():void;
    /**
     * Начат возврат внесенных денег. <br>
     * Для пачечников: возвращается вся внесенная пачка <br>
     * Для покупюрников: возвращается только последняя купюра, если она еще не уложена в кассету. Купюры, уложенные в кассету,
     * переводятся в остаток, доступный для дальнейшего использования <br>
     * Справочное сообщение, активных действий со стороны html не требуется
     */
    rollbackStarted?():void; 
    /**
     * Возврат внесенных денег завершен. <br/>
     * Терминальное состояние.<br/>
     * Возможные действия со стороны html: "start"(рестарт внесения) либо завершение работы с кэшином
     */
    rollbackDone?(p: any):void;
    /**
     * Внесение наличных прекращено из-за сбоя на последней купюре (только для покупюрников). <br>
     * Дальнейшее внесение невозможно, но ранее внесенные и уложенные в кассету купюры доступны для использования, 
     * операция в целом может быть завершена успешно <br>
     */
    stopped?():boolean;
    /**
     * Внесение наличных завершено успешно <br>
     * Терминальное состояние.<br/>
     * Возможные действия со стороны html: завершение работы с кэшином (успешное)
     */
    finished?():void;
    /**
     * Внесение наличных завершено неуспешно из-за фатального сбоя. <br>
     * Терминальное состояние.<br/>
     * Продолжение внесения невозможно. <br>
     * Возможные действия со стороны html: завершение работы с кэшином (неуспешное)
     * @param p Описание сбоя
     */
    failed?(p: CashIn.ErrorIn):void;
    /**
     * Аппаратное событие от кэшина (купюры вставлены, купюры возвращены, купюры забраны и т.д.) <br>
     * Может использоваться как основание для показа информационных сообщений клиенту <br>
     * Активных действий со стороны html не требуется
     * @param p Описание(код) события
     */
    event?(p: CashIn.EventIn):void;
    /**
     * Информационное сообщение о сбое, возникшем во время внесения. <br>
     * Кэшин попытается автоматически устранить сбой и/или вернуть внесенные купюры <br>
     * Активных действий со стороны html не требуется.
     * @param p Описание сбоя
     */
    error?(p: CashIn.ErrorIn):void;
}

/**
 * Команды управления модулем внесения наличных
 */
declare interface ICashInModel {
    /**
     * Начать транзакцию внесения наличных
     * 
     */
    start(): void;
    /**
     * Продолжить внесение наличных согласно алгоритму, реализованному в ядре <br>
     * Конкретное действие, которое будет выполнено по этой команде, определяется ядром автоматически, в зависимости от текущего контекста
     */
    resume(): void;
    /**
     * Отменить внесение наличных с возвратом купюр. <br>
     * Купюры, которые уже уложены в кассеты и не могут быть возвращены, переводятся в остаток.
     */
    rollback(): void;
    /**
     * Выйти из режима ожидания купюр
     * @param p Причина выхода из режима ожидания
     */
    cancel(p?: CashIn.CancelParamIn): void;
    /**
     * Завершить внесение наличных (успешное завершение)
     */
    finish(): void;
    /**
     * Получить текущие настройки кэшина
     * @return Настройки кэшина
     */
    getConfig(): CashIn.Configuration;
}



