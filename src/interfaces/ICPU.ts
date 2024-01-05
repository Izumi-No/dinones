import { IRAM } from "./IRAM.ts";


export interface ICPU {
    pc: number
    sp: number
    a: number
    x: number
    y: number
    status: number
    ram: IRAM
    cycles: number,
    step(): void,
    read(address: number): number,
    read16(address: number): number,
    write(address: number, data: number): void,
    write16(address: number, data: number): void,
    reset(): void
}