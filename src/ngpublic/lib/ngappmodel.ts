import {INgSocket} from "../interfaces/ngsocket";

export namespace ngappmodel{
    export async function sendEmuKey(n:INgSocket, key:string) {
        n.send('ng_emuKeyPressed', key);
    }

    export async function getAppInfo(n:INgSocket):Promise<GetAppInfoOut>{
        const o:GetAppInfoOut =  await n.request("ng_getAppInfo");
        return o;
    }
    export async function setContext(n:INgSocket, p:ISetContext):Promise<void> {
        n.send("ng_setContext", p);
    }

}
