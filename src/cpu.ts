import {
  addressingModeMap,
  addressingModeRecord,
  cyclesMap,
} from "./addressingmodes.ts";
import { IBus } from "./bus.ts";
import { CPUInstructions } from "./cpuInstructions.ts";

export interface ICPU {
  accumulator: number;
  registerX: number;
  registerY: number;
  SP: number;
  PC: number;
  status: number;
  bus: IBus;
  cycles: number;
  read(addr: number): number;
  write(addr: number, data: number): void;
  read16(addr: number): number;
  write16(addr: number, data: number): void;
  clock(): void;
  nmi(): void;
  irq(): void;
  reset(): void;
}

export class CPU implements ICPU {
  accumulator: number;
  registerX: number;
  registerY: number;
  SP: number;
  PC: number;
  status: number;
  bus: IBus;

  constructor(bus: IBus) {
    this.accumulator = 0x00;
    this.registerX = 0x00;
    this.registerY = 0x00;
    this.SP = 0x00;
    this.PC = 0x0000;
    this.status = 0x00;
    this.bus = bus;
  }

  get cycles(): number {
    return this.bus.cycles;
  }
  set cycles(cycles: number) {
    this.bus.cycles = cycles;
  }

  nmi(): void {
    this.PC--;
    this.write16(this.SP, this.PC);
    this.SP--;
    this.write(this.SP, this.status);
    this.SP--;
    this.PC = this.read16(0xfffa);
  }
  irq(): void {
    this.PC--;
    this.write16(this.SP, this.PC);
    this.SP--;
    this.write(this.SP, this.status);
    this.SP--;
    this.PC = this.read16(0xfffe);
  }

  read(addr: number): number {
    return this.bus.read(addr);
  }

  write(addr: number, data: number): void {
    this.bus.write(addr, data);
  }

  read16(addr: number): number {
    return this.bus.read16(addr);
  }

  write16(addr: number, data: number): void {
    this.bus.write16(addr, data);
  }

  clock(): void {
    if (this.cycles === 0) {
      const opcode = this.read(this.PC);

      this.PC++;

      if (opcode === 0x00) {
        this.nmi();

        this.cycles = 7;
        return;
      } else if (opcode === 0xea) {
        this.irq();

        this.cycles = 7;
        return;
      }

      const addressingMode = addressingModeMap[opcode];

      const result = addressingModeRecord[addressingMode](this);
      const instruction = CPUInstructions[opcode];
      instruction(this, result);

      this.cycles = cyclesMap[opcode];
    }
    this.cycles--;
  }

  reset(): void {
    this.SP = 0xfd;
    this.status = 0x24;
    this.PC = this.read16(0xfffc);
  }
}
