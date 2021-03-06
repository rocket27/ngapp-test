
type EStdCancel     = "cancel" | "timeout";
type EStdChoice     = EStdCancel | "ok";

/** Результат завершения диалога, выбранный клиентом */
declare interface IClientChoice {
    /** Возвращаемое диалогом значение ("cancel"/"timeout"/"ok") */
    result: EStdChoice;
}

/** Результат ввода данных клиентом на диалоге */
declare interface IClientInput extends IClientChoice {
    /** Введенные данные (строка) */
    data?: string;
}

/** Результат выполнение какого либо действия */
 declare type ActionResult = {
    /**
     * Код завершения.<br/>
     * Общее соглашение по возвращаемым кодам:<br/>
     * >=0 - успешно<br/>
     * <0 - сбой или операция отменена
     */
    rc: number;
}

/** Описание результата выполнения чего-либо (например, запроса)*/
declare interface IResultDescr {
    /** Код результата.<br/>
     * Общее соглашение по возвращаемым кодам:<br/>
     * >=0 - успешно<br/>
     * <0 - ошибка.
     * -1..-1000 - прикладные ошибки, описание смотри в соотвествуещем запросе.
     * -1001..-2000 - системные ошибки.
     * -1001 - Дублирующее соединение к ngapp. Допустимо только одно соединение.
     * -1002 - Пустое имея модели.
     * -1003 - Неверное имя модели (имя модели в запросе не совпадаем с viewId из которой вызван)
     * -1004 - Метод модели не найден.
     */
    code:       number;
    /** Строка описания */
    message:    string;
}

/** Сумма платежной операции */
declare interface TranAmount {
    /** Величина суммы в минимальных единицах валюты */
    value: number;
    /**
     * Признак, включена ли в сумму комиссия <br>
     * true - сумма включает комиссию <br>
     * false - сумма не включает комиссию <br>
     */
    isCommissionIncluded?: boolean;
}

/** Ограничения на сумму операции */
declare interface AmountRestrictions {
    /** Минимально возможное значение суммы операции */
    minAmount?:   TranAmount;
    /** Максимально возможное значение суммы операции */
    maxAmount?:   TranAmount;
}

/** Результат валидации значения (как правило, введенного клиентом) */
declare interface ValidationResult {
    /** true - значение прошло валидацию, false - не прошло */
    ok:         boolean;
    /** Сообщение для клиента, поясняющее причину отказа (только при неуспешной валидации) */
    message?:   string;
}

/** Результат валидации суммы операции */
declare interface AmountValidationResult extends ValidationResult {
    /**
     * Признак необходимости автозавершения <br>
     * true - требуемая (фискированная или максимальная) сумма операции достигнута, требуется автоматически завершить внесение наличных <br>
     * false - требуемая сумма операции не достигнута, можно довнести еще наличные
     */
    isFinish? : boolean;
}
