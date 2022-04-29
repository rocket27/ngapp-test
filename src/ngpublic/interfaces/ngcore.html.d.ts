/**
 * Передаваемый аргумент, при вызове selectApplication.html
 */
declare interface ISelectApplicationDataArgs {
    /**
     * Спискок приложений, где name-название приложения, диалог надо завершить вызовом window.ngUi().exitView('RET_OK', ""+i)
     */

    app:{name:string, res:string}[];
}

/**
 * Передаваемый аргумент, при вызове selectTranAuthStatus.html
 */
declare interface IShowTranAuthStatusDataArgs {
    /**
     * уникальный идентификатор сообщения.
     */
    id?:string;
    /**
     * Текст сообщения, соответсвующий идентификатору, на языке клиента.
     */
    text:string;
    /**
     * Дополнитительное сообщение, например присланное с узла.
     */
    authMsg?:string;
}

/**
 * Передаваемый аргумент, при вызове showError.html
 */
declare interface IShowErrorDataArgs {
    /**
     * Уникальный идентификатор сообщения.
     */
    id?:string;
    /**
     * Текст сообщения, соответствующий идентификатору, на языке клиента.
     */
    text:string;
}


/**
 * Передаваемый аргумент, при вызове showTakeReceipt.html  (возьмите чек)
 */
declare interface IShowTakeReceiptDataArgs {
    delay:number;
}


/**
 * Передаваемый аргумент, при вызове enterPin.html  (возьмите чек)
 */
declare interface IShowEnterPinArgs {
    /**
     * Минимальная длина пинблока
     */
    min:number;
    /**
     * Максимальная длина пинблока
     */
    max:number;

    /**
     * Включен или нет режим автозавершения.
     */
    isAutoComplete:boolean;
    /**
     * Оставшееся колличество попыток ввода пинкода, если не известно -1
     */
    tryLeft:number;
    /**
     * Заголовок.
     */
    caption:string;
}
