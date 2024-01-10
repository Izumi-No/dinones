import { IFileReader } from "./adapters/interfaces/IFileReader.ts";
import { MapperBase } from "./mappers.ts";

export enum Mirroring {
  HARDWARE,
  HORIZONTAL,
  VERTICAL,
  ONESCREEN_LO,
  ONESCREEN_HI,
}

export interface ICartridgeHeader {
  prgSize: number;
  chrSize: number;
  sramSize: number;
  battery: boolean;
  mirror: Mirroring;
  mapper: number;
}

export interface ICartridge {
  header?: ICartridgeHeader;
  prg: Uint8Array;
  chr: Uint8Array;
  sram: Uint8Array;
  readPrg(addr: number): number;
  writePrg(addr: number, data: number): void;
  readChr(addr: number): number;
  writeChr(addr: number, data: number): void;
  save(): Uint8Array;
  load(data: Uint8Array): void;
}
export class Cartridge implements ICartridge {
  private constructor(
    public prg: Uint8Array,
    public chr: Uint8Array,
    public sram: Uint8Array,
    public battery: boolean,
    public mapper: MapperBase,
    public mirror: Mirroring,
    public header: ICartridgeHeader
  ) {}

  async create(
    path: string,
    fileReader: IFileReader,
    mapperMap: Record<number, MapperBase>
  ): Promise<Cartridge> {
    const data = await fileReader.read(path);

    const header = this.parseHeader(data);

    const prg = data.slice(16, 16 + header.prgSize * 0x4000);

    const chr = data.slice(
      16 + header.prgSize * 0x4000,
      16 + header.prgSize * 0x4000 + header.chrSize * 0x2000
    );

    const sram = new Uint8Array(header.sramSize);

    const mapper = mapperMap[header.mapper];

    return new Cartridge(
      prg,
      chr,
      sram,
      header.battery,
      mapper,
      header.mirror,
      header
    );
  }

  private parseHeader(data: Uint8Array): ICartridgeHeader {
    const prgSize = data[4];
    const chrSize = data[5];
    const sramSize = data[8];
    const battery = (data[6] & 0b10) !== 0;
    const mirror =
      (data[6] & 0b1) !== 0 ? Mirroring.VERTICAL : Mirroring.HORIZONTAL;
    const mapper = (data[7] & 0xf0) | (data[6] >> 4);

    return {
      prgSize,
      chrSize,
      sramSize,
      battery,
      mirror,
      mapper,
    };
  }

  readPrg(addr: number): number {
    const address = this.mapper.readPrg(addr);

    return this.prg[address];
  }

  writePrg(addr: number, data: number): void {
    this.mapper.writePrg(addr, data);
  }

  readChr(addr: number): number {
    const address = this.mapper.readChr(addr);

    return this.chr[address];
  }

  writeChr(addr: number, data: number): void {
    this.mapper.writeChr(addr, data);
  }

  save(): Uint8Array {
    return this.sram;
  }

  load(data: Uint8Array): void {
    this.sram = data;
  }
}
