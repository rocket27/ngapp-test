import {INgSocket} from "../interfaces/ngsocket";

export class NgCardModel implements ICardModel {
    ngSocket;

    constructor(n:INgSocket) {
        this.ngSocket = n;
    }

    async getCardInfo(): Promise<ICardInfoOut> {
        return this.ngSocket.request("ngcard.getCardInfo");
    }

    async getMiniStatement(obj: IMiniStatementIn): Promise<IMiniStatementOut> {
        return this.ngSocket.request("ngcard.getMiniStatement", obj);
    }

    async printCardInfo(): Promise<void> {
        return this.ngSocket.request("ngcard.printCardInfo");
    }

    async printMiniStatement(): Promise<void> {
        return this.ngSocket.request("ngcard.printMiniStatement");
    }

    async unlock(): Promise<void> {
        return undefined;
    }

}
