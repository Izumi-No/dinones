interface Mapper {
  readPrg(addr: number): number;
  writePrg(addr: number, data: number): number;
  readChr(addr: number): number;
  writeChr(addr: number, data: number): number;
  reset(): void;
  irqState: boolean;
  irqClear(): void;
  scalines: number;
}

export abstract class MapperBase implements Mapper {
  protected prgBankCount: number;
  protected chrBankCount: number;

  constructor(prgBankCount: number, chrBankCount: number) {
    this.prgBankCount = prgBankCount;
    this.chrBankCount = chrBankCount;
  }

  abstract readPrg(addr: number): number;
  abstract writePrg(addr: number, data: number): number;
  abstract readChr(addr: number): number;
  abstract writeChr(addr: number, data: number): number;
  abstract reset(): void;
  abstract irqState: boolean;
  abstract irqClear(): void;
  abstract scalines: number;
}

export class Mapper000 extends MapperBase {
  constructor(prgBankCount: number, chrBankCount: number) {
    super(prgBankCount, chrBankCount);
  }

  readPrg(addr: number): number {
    if (addr >= 0x8000 && addr <= 0xffff) {
      return addr & (this.prgBankCount > 1 ? 0x7fff : 0x3fff);
    }
    return 0;
  }

  writePrg(addr: number, data: number): void {
    // No write operation needed for Mapper000
  }

  readChr(addr: number): number {
    // There is no mapping required for CHR ROM
    // CHR Address Bus          CHR ROM
    // 0x0000 -> 0x1FFF: Map    0x0000 -> 0x1FFF
    if (addr >= 0x0000 && addr <= 0x1fff) {
      return addr;
    }
    return 0;
  }

  writeChr(addr: number, data: number): void {
    // No write operation needed for CHR ROM
  }

  reset(): void {
    // No specific reset operation needed for Mapper000
  }

  get irqState(): boolean {
    return false;
  }

  irqClear(): void {
    // No IRQ handling for Mapper000
  }

  get scalines(): number {
    return 262;
  }
}

export class Mapper001 extends MapperBase {
  private prgBankMode: number;
  private prgBankSelect: number;
  private chrBankMode: number;
  private chrBankSelect0: number;
  private chrBankSelect1: number;
  private irqCounter: number;
  private irqReload: boolean;
  private irqEnable: boolean;

  constructor(prgBankCount: number, chrBankCount: number) {
    super(prgBankCount, chrBankCount);

    this.prgBankMode = 0;
    this.prgBankSelect = 0;
    this.chrBankMode = 0;
    this.chrBankSelect0 = 0;
    this.chrBankSelect1 = 0;
    this.irqCounter = 0;
    this.irqReload = false;
    this.irqEnable = false;
  }

  readPrg(addr: number): number {
    if (addr < 0x8000) {
      return addr & 0x7fff;
    } else {
      if (this.prgBankMode === 0) {
        if (addr < 0xc000) {
          return this.prgBankSelect * 0x4000 + (addr & 0x3fff);
        } else {
          return (this.prgBankCount - 1) * 0x4000 + (addr & 0x3fff);
        }
      } else {
        if (addr < 0xc000) {
          return (this.prgBankCount - 2) * 0x4000 + (addr & 0x3fff);
        } else {
          return this.prgBankSelect * 0x4000 + (addr & 0x3fff);
        }
      }
    }
  }

  writePrg(addr: number, data: number): void {
    if (addr < 0x8000) {
      this.prgBankMode = (data >> 6) & 0x01;
      this.chrBankMode = (data >> 7) & 0x01;
    } else {
      if (this.prgBankMode === 0) {
        this.prgBankSelect = data & 0x0f;
      } else {
        this.chrBankSelect0 = data & 0x1f;
      }
    }
  }

  readChr(addr: number): number {
    if (this.chrBankMode === 0) {
      if (addr < 0x1000) {
        return this.chrBankSelect0 * 0x1000 + addr;
      } else {
        return this.chrBankSelect1 * 0x1000 + (addr & 0x0fff);
      }
    } else {
      return this.chrBankSelect0 * 0x2000 + addr;
    }
  }

  writeChr(addr: number, data: number): void {
    return;
  }

  reset(): void {
    this.prgBankMode = 0;
    this.prgBankSelect = 0;
    this.chrBankMode = 0;
    this.chrBankSelect0 = 0;
    this.chrBankSelect1 = 0;
    this.irqCounter = 0;
    this.irqReload = false;
    this.irqEnable = false;
  }

  get irqState(): boolean {
    return false;
  }

  irqClear(): void {
    return;
  }

  get scalines(): number {
    return 262;
  }
}

export class Mapper002 extends MapperBase {
  private prgBankMode: number;
  private prgBankSelect: number;
  private chrBankMode: number;
  private chrBankSelect0: number;
  private chrBankSelect1: number;
  private irqCounter: number;
  private irqReload: boolean;
  private irqEnable: boolean;

  constructor(prgBankCount: number, chrBankCount: number) {
    super(prgBankCount, chrBankCount);

    this.prgBankMode = 0;
    this.prgBankSelect = 0;
    this.chrBankMode = 0;
    this.chrBankSelect0 = 0;
    this.chrBankSelect1 = 0;
    this.irqCounter = 0;
    this.irqReload = false;
    this.irqEnable = false;
  }

  readPrg(addr: number): number {
    if (addr < 0x8000) {
      return addr & 0x7fff;
    } else {
      if (this.prgBankMode === 0) {
        if (addr < 0xc000) {
          return this.prgBankSelect * 0x4000 + (addr & 0x3fff);
        } else {
          return (this.prgBankCount - 1) * 0x4000 + (addr & 0x3fff);
        }
      } else {
        if (addr < 0xc000) {
          return (this.prgBankCount - 2) * 0x4000 + (addr & 0x3fff);
        } else {
          return this.prgBankSelect * 0x4000 + (addr & 0x3fff);
        }
      }
    }
  }

  writePrg(addr: number, data: number): void {
    if (addr < 0x8000) {
      this.prgBankMode = (data >> 6) & 0x01;
      this.chrBankMode = (data >> 7) & 0x01;
    } else {
      if (this.prgBankMode === 0) {
        this.prgBankSelect = data & 0x0f;
      } else {
        this.chrBankSelect0 = data & 0x1f;
      }
    }
  }

  readChr(addr: number): number {
    if (this.chrBankMode === 0) {
      if (addr < 0x1000) {
        return this.chrBankSelect0 * 0x1000 + addr;
      } else {
        return this.chrBankSelect1 * 0x1000 + (addr & 0x0fff);
      }
    }

    return this.chrBankSelect0 * 0x2000 + addr;
  }

  writeChr(addr: number, data: number): void {
    return;
  }

  reset(): void {
    this.prgBankMode = 0;
    this.prgBankSelect = 0;
    this.chrBankMode = 0;
    this.chrBankSelect0 = 0;
    this.chrBankSelect1 = 0;
    this.irqCounter = 0;
    this.irqReload = false;
    this.irqEnable = false;
  }

  get irqState(): boolean {
    return false;
  }

  irqClear(): void {
    return;
  }

  get scalines(): number {
    return 262;
  }
}

export class Mapper003 extends MapperBase {
  private chrBankSelect: number;

  constructor(prgBankCount: number, chrBankCount: number) {
    super(prgBankCount, chrBankCount);

    this.chrBankSelect = 0;
  }

  readPrg(addr: number): number {
    if (addr >= 0x8000 && addr <= 0xffff) {
      if (this.prgBankCount === 1) {
        // 16K ROM
        return addr & 0x3fff;
      } else if (this.prgBankCount === 2) {
        // 32K ROM
        return addr & 0x7fff;
      }
    }
    return 0;
  }

  writePrg(addr: number, data: number): void {
    if (addr >= 0x8000 && addr <= 0xffff) {
      this.chrBankSelect = data & 0x03;
    }
  }

  readChr(addr: number): number {
    if (addr < 0x2000) {
      return this.chrBankSelect * 0x2000 + addr;
    }
    return addr;
  }

  writeChr(addr: number, data: number): void {
    // Handle CHR writes if needed
  }

  reset(): void {
    this.chrBankSelect = 0;
  }

  get irqState(): boolean {
    return false;
  }

  irqClear(): void {
    // Handle IRQ clear if needed
  }

  get scalines(): number {
    return 262;
  }
}

export const mappers: { [key: number]: MapperBase } = {
  0: new Mapper000(1, 0),
  1: new Mapper001(2, 0),
  2: new Mapper002(1, 0),
  3: new Mapper003(1, 0), // Add Mapper003
};
