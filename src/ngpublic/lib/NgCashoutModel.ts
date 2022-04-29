import {INgSocket} from "../interfaces/ngsocket";

/*
export interface WithdRequest {
    confirm(data:IConfirm):Promise<boolean>;
    withdStep(data:IMessage):Promise<void>;
    withdError(data:IMessage):Promise<void>;
}
*/
export class NgCashoutModel implements ICashoutModel{
    ngSocket;
    cb;

    constructor(n:INgSocket, cb?:ICashoutEventsOut, isPrintReceipt:boolean = true) {
        this.ngSocket = n;
        this.cb = cb;

        if(cb){
            this.ngSocket.on("ngcashout.confirm", (data:IConfirm, request)=>{
                cb.confirm(data).then(x=>request?.send(x?"yes":"no"));
            })

            // @ts-ignore
            this.ngSocket.on("ngcashout.print_receipt", (data, request) => {
                request?.send(isPrintReceipt?"yes":"no");
            })

            this.ngSocket.on("ngcashout.msg_step", (data:IMessage)=>{
                const id = data.str_id.match(/(?:pkg:)?(.*)/)?.[1];
                cb.msg_step({str_id:id?id:"", text:data.text})
            });

            this.ngSocket.on("ngcashout.msg_error", (data:IMessage, request)=>{
                // @ts-ignore
                cb.msg_error(data).then(x=>request?.send("ok"));
            });
        }

    }

    async getContext(): Promise<IGetContextOut> {
        return this.ngSocket.request("ngcashout.getContext");
    }
    async getCurrencyInfo(i: IGetCurrencyInfoIn): Promise<IGetCurrencyInfoOut> {
        return this.ngSocket.request("ngcashout.getCurrencyInfo", i);
    }
    async coreValidateAmount(i: ICoreValidationIn): Promise<ICoreValidationOut> {
        return this.ngSocket.request("ngcashout.coreValidateAmount", i);
    }
    async startTransaction(i: IStartTransactionIn): Promise<IStartTransactionOut> {
        return this.ngSocket.request("ngcashout.startTransaction", i);
    }
    async calculateCommission(i: ICalculateCommissionIn): Promise<ICalculateCommissionOut> {
        return this.ngSocket.request("ngcashout.calculateCommission", i);
    }
    async denominate(i: IDispenseData): Promise<IWithdDenominateOut> {
        return this.ngSocket.request("ngcashout.denominate", i);
    }

}