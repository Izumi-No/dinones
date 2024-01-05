import { IFileReader } from "./adapters/interfaces/IFileReader.ts";
import { ICartridge, ICartridgeHeader } from "./interfaces/ICartridge.ts";
import { IRAM } from "./interfaces/IRAM.ts";


export class Cartridge implements ICartridge {
    private fs: IFileReader
    private isLoaded = false
    prg: Array<number>
    ram: IRAM
    chr: Array<number>
    mapper: number
    header: ICartridgeHeader;
    constructor(fs: IFileReader, ram: IRAM) {
        this.fs = fs
        this.prg = []
        this.chr = []
        this.ram = ram
        this.mapper = 0
        this.header = {
            prgSize: 0,
            chrSize: 0,
            flags6: 0,
            flags7: 0,
            flags9: 0,
            flags10: 0,
            mapper: 0,
            mirror: []
        }
    }
    
    mapperId(): number {
      return (this.mapper & 0xf0) | (this.flags7 >> 4);
    }
    inesMap(): number {
        return this.flags6 >> 4
    }
    trainer(): boolean {
        return (this.flags6 & 0x04) != 0
    }
  
    async load(path: string): Promise<void>{
        if (this.isLoaded) {
            throw new Error("Cartridge already loaded")
        }

        const buffer = await this.fs.read(path)
    
        const mirror = buffer.slice(0, 4)
        this.mirror = Array.from(mirror)

        const header = new TextDecoder().decode(mirror) 
        
        if (header !== "NES\x1a") {
            throw new Error("Invalid ROM")
        }


        this.flags6 = buffer[6]
        this.flags7 = buffer[7]

        this.flags9 = buffer[9]
        this.flags10 = buffer[10]



        this.mapper = buffer[4] >> 4
        const prgSize = buffer[4] & 0x0F
        const chrSize = buffer[5] >> 4
        this.prgSize = prgSize
        this.chrSize = chrSize

        const prgOffset = 16
        const chrOffset = prgOffset + prgSize * 16384

        this.prg = Array.from(buffer.slice(prgOffset, prgOffset + prgSize * 16384))

        this.chr = Array.from(buffer.slice(chrOffset, chrOffset + chrSize * 8192))

        this.isLoaded = true
    }

    reset(): void {
        if (!this.isLoaded) {
            throw new Error("Cartridge not loaded")
        }
    }

  
}
