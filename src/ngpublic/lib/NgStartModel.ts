import {INgSocket} from "../interfaces/ngsocket";


export class NgStartModel implements IStartModel {
    ngSocket;

    constructor(n:INgSocket) {
        this.ngSocket = n;
    }

    async setPreselectedUrl(param: PreselectedUrlIn){
        return this.ngSocket.request("ngstart.setPreselectedUrl", param);
    }

    async getMenu(menuReqParam:GetMenuIn):Promise<GetMenuOut> {
        return this.ngSocket.request("ngstart.getMenu", menuReqParam);
    }

    async getScreenPlay(): Promise<GetScreenPlayOut>{
        return this.ngSocket.request("ngstart.getScreenPlay");
    }

    async eppOperPassword() : Promise<string> {
        return this.ngSocket.request("ngstart.eppOperPassword");
    }

    async executeUrl(url: string): Promise<IRetExecUrl> {
        return this.ngSocket.request("ngstart.executeUrl", url);
    }

}

