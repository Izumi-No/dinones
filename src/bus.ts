// 6502 bus interface

export interface IBus {
  WRAM: Uint8Array;
  cycles: number;
  // prgROM: Uint8Array;
  read(addr: number): number;
  write(addr: number, data: number): void;
  read16(addr: number): number;
  write16(addr: number, data: number): void;
}

export class Bus implements IBus {
  WRAM: Uint8Array;
  cycles: number;

  constructor() {
    this.WRAM = new Uint8Array(0x800);
    this.cycles = 0;
  }

  read(addr: number): number {
    if (addr < 0x2000) {
      return this.WRAM[addr & 0x7ff];
    } else if (addr < 0x4000) {
      return 0;
    } else if (addr < 0x4018) {
      return 0;
    } else if (addr < 0x4020) {
      return 0;
    } else {
      return 0;
    }
  }

  write(addr: number, data: number): void {
    if (addr < 0x2000) {
      this.WRAM[addr & 0x7ff] = data;
    } else if (addr < 0x4000) {
      return;
    } else if (addr < 0x4018) {
      return;
    } else if (addr < 0x4020) {
      return;
    } else {
      return;
    }
  }

  read16(addr: number): number {
    return this.read(addr) | (this.read(addr + 1) << 8);
  }

  write16(addr: number, data: number): void {
    this.write(addr, data & 0xff);
    this.write(addr + 1, data >> 8);
  }
}
