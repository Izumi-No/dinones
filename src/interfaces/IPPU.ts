import { IRAM } from "./IRAM.ts";

export interface IPPU{
    ctrl: number
    mask: number
    status: number
    oamAddress: number
    scroll: number
    address: number
    data: IRAM
    oamDMA: number
}