/// <reference path="./include.d.ts"/>

/** Информация о карте */
declare interface ICardInfoOut {
	/** Остаток средств в минимальных единицах */
	balance:number;
	/** ISO-код валюты */
	curCode:string;
}

/**
* Тип запрашиваемой мини выписки.
* "mini_statement_dbo" - мини выписка из ДБО
* "mini_statement_card" - по карте
* "mini_statement_account" - по счёту
*/
type EntryListMiniStatement ="mini_statement_dbo"|"mini_statement_card"|"mini_statement_account";

/** Тип операции по карте
 * "cardinfo" - информация о карте
 * "unlock" - разблокировать карту
 * "change_pin" - смена PIN-кода
 * "cashin" - внесение наличных на карту
 */
type EntryList = EntryListMiniStatement|"cardinfo"|"unlock"|"change_pin"|"cashin";

/** Параметры отображения ngcard.html */
declare interface INgCardArgs{
	/** Операция */
	entry:EntryList;
}

/** Параметры запроса мини-выписки */
declare interface IMiniStatementIn{
	/** Тип мини-выписки */
	type:EntryListMiniStatement;
}
/** Результат запроса мини-выписки */
declare interface IMiniStatementOut {
	/** Информация мини-выписки */
	scr:string;
}

declare interface ICardModel  { //NgHtmlInterface
	/** Получение информации о карте */
    getCardInfo(): ICardInfoOut | IResultDescr | Promise<ICardInfoOut>;
	/** Печать информации о карте */
	printCardInfo():void| IResultDescr| Promise<void>;
	/** Получение мини выписки */
	getMiniStatement(obj:IMiniStatementIn):IMiniStatementOut| IResultDescr | Promise<IMiniStatementOut>;
	/** Печать мини выписки
	 * @returns результат операции: 
	 * *данные мини-выписки - в случае успешного выполнения
	 * *код и описание ошибки - если операция не выполнена
	 */
	printMiniStatement():void| IResultDescr| Promise<void>;
	/** Разблокировать карту
	 * @returns результат операции: 
	 * *пустой - в случае успешного выполнения
	 * *код и описание ошибки - если операция не выполнена
	 * 	 */
	unlock():void| IResultDescr| Promise<void>;
}

/** Результат выполнения транзакции */
declare interface ITranExecResult{
	/** Код результата */
	rc:number;
}

/** Модель пополнения карты наличными. Функционал пока в разработке */
declare interface ICashin2CardModel  { //NgHtmlInterface
	/** Выполнить транзакцию */
	tranExecute(): ITranExecResult;
}

/** Информация о внесённых наличных */
declare interface ICashinAmount {
	/** Внесенная сумма (в минимальных единицах валюты) */
	cashinAmount:number;
	/** Комиссия (в минимальных единицах валюты) */
	commission:number;
	/** Сумма к зачислению (в минимальных единицах валюты) */
	clientAmount:number;
	/** ISO-код валюты (810 для рубля и т.д.)*/
	currency:string;
	/** Разрешить показывать кнопку "Завершить приём", если внесено достаточно денег */
	isDone:boolean;
}