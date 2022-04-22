/// <Reference path="./ngsocket.d.ts"/>;

import {GlobalNgSocket} from "./ngsocket";

export declare global { interface Window extends GlobalNgSocket{ }}
