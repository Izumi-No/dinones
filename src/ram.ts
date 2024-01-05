import { IRAM } from "./interfaces/IRAM.ts";



export class Ram implements IRAM{
    size: number;
    ram: Array<number>;

    constructor(size: number){
        this.size = size;
        this.ram = new Array<number>(size);
    }

    read(address: number): number {
        return this.ram[address];
    }

    read16(address: number): number {
        const high = this.ram[address + 1];
        const low = this.ram[address];
        return (high << 8) | low;
    }

    write(address: number, data: number): void {
        this.ram[address] = data;
    }

    write16(address: number, data: number): void {
        const high = (data & 0xFF00) >> 8;
        const low = data & 0xFF;

        this.ram[address] = low;
        this.ram[address + 1] = high;
    }
    
    reset(): void {
        this.ram = new Array<number>(this.size);
    }
}