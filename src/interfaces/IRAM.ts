
export interface IRAM {
    size: number
    ram: Array<number>
    read(address: number): number
    read16(address: number): number
    write(address: number, data: number): void
    write16(address: number, data: number): void
    reset(): void

}