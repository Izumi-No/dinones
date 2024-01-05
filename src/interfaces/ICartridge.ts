import { IRAM } from "./IRAM.ts";

export interface ICartridgeHeader {
    prgSize: number
    chrSize: number
    flags6: number
    flags7: number
    flags9: number
    flags10: number
    mapper: number
    mirror: Array<number>
}

export interface ICartridge {
    prg: Array<number>
    chr: Array<number>
    ram: IRAM
    mapper: number
    header: ICartridgeHeader
    reset(): void
    mapperId(): number
    inesMap(): number
    trainer(): boolean
    load(path: string): Promise<void>
}