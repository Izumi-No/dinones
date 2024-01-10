import { ICPU } from "./cpu.ts";

export const CPUInstructions: {
  [opcode: string]:
    | ((cpu: ICPU, address: number) => void)
    | ((cpu: ICPU) => void)
    | (() => void);
} = {
  0x00: BRK,
  0x01: ORA,
  0x05: ORA,
  0x06: ASL,
  0x08: PHP,
  0x09: ORA,
  0x0a: ASL,
  0x0d: ORA,
  0x0e: ASL,
  0x10: BPL,
  0x11: ORA,
  0x15: ORA,
  0x16: ASL,
  0x18: CLC,
  0x19: ORA,
  0x1d: ORA,
  0x1e: ASL,
  0x20: JSR,
  0x21: AND,
  0x24: BIT,
  0x25: AND,
  0x26: ROL,
  0x28: PLP,
  0x29: AND,
  0x2a: ROL,
  0x2c: BIT,
  0x2d: AND,
  0x2e: ROL,
  0x30: BMI,
  0x31: AND,
  0x35: AND,
  0x36: ROL,
  0x38: SEC,
  0x39: AND,
  0x3d: AND,
  0x3e: ROL,
  0x40: RTI,
  0x41: EOR,
  0x45: EOR,
  0x46: LSR,
  0x48: PHA,
  0x49: EOR,
  0x4a: LSR,
  0x4c: JMP,
  0x4d: EOR,
  0x4e: LSR,
  0x50: BVC,
  0x51: EOR,
  0x55: EOR,
  0x56: LSR,
  0x58: CLI,
  0x59: EOR,
  0x5d: EOR,
  0x5e: LSR,
  0x60: RTS,
  0x61: ADC,
  0x65: ADC,
  0x66: ROR,
  0x68: PLA,
  0x69: ADC,
  0x6a: ROR,
  0x6c: JMP,
  0x6d: ADC,
  0x6e: ROR,
  0x70: BVS,
  0x71: ADC,
  0x75: ADC,
  0x76: ROR,
  0x78: SEI,
  0x79: ADC,
  0x7d: ADC,
  0x7e: ROR,
  0x81: STA,
  0x84: STY,
  0x85: STA,
  0x86: STX,
  0x88: DEY,
  0x8a: TXA,
  0x8c: STY,
  0x8d: STA,
  0x8e: STX,
  0x90: BCC,
  0x91: STA,
  0x94: STY,
  0x95: STA,
  0x96: STX,
  0x98: TYA,
  0x99: STA,
  0x9a: TXS,
  0x9d: STA,
  0xa0: LDY,
  0xa1: LDA,
  0xa2: LDX,
  0xa4: LDY,
  0xa5: LDA,
  0xa6: LDX,
  0xa8: TAY,
  0xa9: LDA,
  0xaa: TAX,
  0xac: LDY,
  0xad: LDA,
  0xae: LDX,
  0xb0: BCS,
  0xb1: LDA,
  0xb4: LDY,
  0xb5: LDA,
  0xb6: LDX,
  0xb8: CLV,
  0xb9: LDA,
  0xba: TSX,
  0xbc: LDY,
  0xbd: LDA,
  0xbe: LDX,
  0xc0: CPY,
  0xc1: CMP,
  0xc4: CPY,
  0xc5: CMP,
  0xc6: DEC,
  0xc8: INY,
  0xc9: CMP,
  0xca: DEX,
  0xcc: CPY,
  0xcd: CMP,
  0xce: DEC,
  0xd0: BNE,
  0xd1: CMP,
  0xd5: CMP,
  0xd6: DEC,
  0xd8: CLD,
  0xd9: CMP,
  0xdd: CMP,
  0xde: DEC,
  0xe0: CPX,
  0xe1: SBC,
  0xe4: CPX,
  0xe5: SBC,
  0xe6: INC,
  0xe8: INX,
  0xe9: SBC,
  0xea: NOP,
  0xec: CPX,
  0xed: SBC,
  0xee: INC,
  0xf0: BEQ,
  0xf1: SBC,
  0xf5: SBC,
  0xf6: INC,
  0xf8: SED,
  0xf9: SBC,
  0xfd: SBC,
  0xfe: INC,
};

export const CPUCycles: { [opcode: string]: number } = {
  0x00: 7,
  0x01: 6,
  0x05: 3,
  0x06: 5,
  0x08: 3,
  0x09: 2,
  0x0a: 2,
  0x0d: 4,
  0x0e: 6,
  0x10: 2,
  0x11: 5,
  0x15: 4,
  0x16: 6,
  0x18: 2,
  0x19: 4,
  0x1d: 4,
  0x1e: 7,
  0x20: 6,
  0x21: 6,
  0x24: 3,
  0x25: 3,
  0x26: 5,
  0x28: 4,
  0x29: 2,
  0x2a: 2,
  0x2c: 4,
  0x2d: 4,
  0x2e: 6,
  0x30: 2,
  0x31: 5,
  0x35: 4,
  0x36: 6,
  0x38: 2,
  0x39: 4,
  0x3d: 4,
  0x3e: 7,
  0x40: 6,
  0x41: 6,
  0x45: 3,
  0x46: 5,
  0x48: 3,
  0x49: 2,
  0x4a: 2,
  0x4c: 3,
  0x4d: 4,
  0x4e: 6,
  0x50: 2,
  0x51: 5,
  0x55: 4,
  0x56: 6,
  0x58: 2,
  0x59: 4,
  0x5d: 4,
  0x5e: 7,
  0x60: 6,
  0x61: 6,
  0x65: 3,
  0x66: 5,
  0x68: 4,
  0x69: 2,
  0x6a: 2,
  0x6c: 5,
  0x6d: 4,
  0x6e: 6,
  0x70: 2,
  0x71: 5,
  0x75: 4,
  0x76: 6,
  0x78: 2,
  0x79: 4,
  0x7d: 4,
  0x7e: 7,
  0x81: 6,
  0x84: 3,
  0x85: 3,
  0x86: 3,
  0x88: 2,
  0x8a: 2,
  0x8c: 4,
  0x8d: 4,
  0x8e: 4,
  0x90: 2,
  0x91: 6,
  0x94: 4,
  0x95: 4,
  0x96: 4,
  0x98: 2,
  0x99: 5,
  0x9a: 2,
  0x9d: 5,
  0xa0: 2,
  0xa1: 6,
  0xa2: 2,
  0xa4: 3,
  0xa5: 3,
  0xa6: 3,
  0xa8: 2,
  0xa9: 2,
  0xaa: 2,
  0xac: 4,
  0xad: 4,
  0xae: 4,
  0xb0: 2,
  0xb1: 5,
  0xb4: 4,
  0xb5: 4,
  0xb6: 4,
  0xb8: 2,
  0xb9: 4,
  0xba: 2,
  0xbc: 4,
  0xbd: 4,
  0xbe: 4,
  0xc0: 2,
  0xc1: 6,
  0xc4: 3,
  0xc5: 3,
  0xc6: 5,
  0xc8: 2,
  0xc9: 2,
  0xca: 2,
  0xcc: 4,
  0xcd: 4,
  0xce: 6,
  0xd0: 2,
  0xd1: 5,
  0xd5: 4,
  0xd6: 6,
  0xd8: 2,
  0xd9: 4,
  0xdd: 4,
  0xde: 7,
  0xe0: 2,
  0xe1: 6,
  0xe4: 3,
  0xe5: 3,
  0xe6: 5,
  0xe8: 2,
  0xe9: 2,
  0xea: 2,
  0xec: 4,
  0xed: 4,
  0xee: 6,
  0xf0: 2,
  0xf1: 5,
  0xf5: 4,
  0xf6: 6,
  0xf8: 2,
  0xf9: 4,
  0xfd: 4,
  0xfe: 7,
};

function ADC(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = cpu.accumulator + value + (cpu.status & 0x01);
  cpu.status = cpu.status & 0xfe;
  if (result > 255) {
    cpu.status = cpu.status | 0x01;
  }
  cpu.accumulator = result & 0xff;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function AND(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.accumulator = cpu.accumulator & value;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function ASL(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.status = cpu.status & 0xfe;
  if ((value & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x01;
  }
  const result = value << 1;
  cpu.write(address, result);
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
}

function BCC(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x01) === 0x00) {
    cpu.PC = address;
  }
}

function BCS(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x01) === 0x01) {
    cpu.PC = address;
  }
}

function BEQ(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x02) === 0x02) {
    cpu.PC = address;
  }
}

function BIT(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = cpu.accumulator & value;
  cpu.status = cpu.status & 0x3d;
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
  if ((result & 0x40) === 0x40) {
    cpu.status = cpu.status | 0x40;
  }
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
}

function BMI(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x80) === 0x80) {
    cpu.PC = address;
  }
}

function BNE(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x02) === 0x00) {
    cpu.PC = address;
  }
}

function BPL(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x80) === 0x00) {
    cpu.PC = address;
  }
}

function BRK(cpu: ICPU): void {
  cpu.PC = cpu.PC + 1;
  cpu.write(0x0100 + cpu.SP, (cpu.PC >> 8) & 0xff);
  cpu.SP = cpu.SP - 1;
  cpu.write(0x0100 + cpu.SP, cpu.PC & 0xff);
  cpu.SP = cpu.SP - 1;
  cpu.write(0x0100 + cpu.SP, cpu.status);
  cpu.SP = cpu.SP - 1;
  cpu.status = cpu.status | 0x10;
  cpu.PC = cpu.read16(0xfffe);
}

function BVC(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x40) === 0x00) {
    cpu.PC = address;
  }
}

function BVS(cpu: ICPU, address: number): void {
  if ((cpu.status & 0x40) === 0x40) {
    cpu.PC = address;
  }
}

function CLC(cpu: ICPU): void {
  cpu.status = cpu.status & 0xfe;
}

function CLD(cpu: ICPU): void {
  cpu.status = cpu.status & 0xf7;
}

function CLI(cpu: ICPU): void {
  cpu.status = cpu.status & 0xfb;
}

function CLV(cpu: ICPU): void {
  cpu.status = cpu.status & 0xbf;
}

function CMP(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = cpu.accumulator - value;
  cpu.status = cpu.status & 0xfe;
  if (result >= 0) {
    cpu.status = cpu.status | 0x01;
  }
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function CPX(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = cpu.registerX - value;
  cpu.status = cpu.status & 0xfe;
  if (result >= 0) {
    cpu.status = cpu.status | 0x01;
  }
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function CPY(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = cpu.registerY - value;
  cpu.status = cpu.status & 0xfe;
  if (result >= 0) {
    cpu.status = cpu.status | 0x01;
  }
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function DEC(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = value - 1;
  cpu.write(address, result);
  cpu.status = cpu.status & 0xfe;
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function DEX(cpu: ICPU): void {
  cpu.registerX = cpu.registerX - 1;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerX === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerX & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function DEY(cpu: ICPU): void {
  cpu.registerY = cpu.registerY - 1;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerY === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerY & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function EOR(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.accumulator = cpu.accumulator ^ value;
  cpu.status = cpu.status & 0xfe;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function INC(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = value + 1;
  cpu.write(address, result);
  cpu.status = cpu.status & 0xfe;
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function INX(cpu: ICPU): void {
  cpu.registerX = cpu.registerX + 1;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerX === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerX & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function INY(cpu: ICPU): void {
  cpu.registerY = cpu.registerY + 1;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerY === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerY & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function JMP(cpu: ICPU, address: number): void {
  cpu.PC = address;
}

function JSR(cpu: ICPU, address: number): void {
  cpu.PC = cpu.PC - 1;
  cpu.write(0x0100 + cpu.SP, (cpu.PC >> 8) & 0xff);
  cpu.SP = cpu.SP - 1;
  cpu.write(0x0100 + cpu.SP, cpu.PC & 0xff);
  cpu.SP = cpu.SP - 1;
  cpu.PC = address;
}

function LDA(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.accumulator = value;
  cpu.status = cpu.status & 0xfe;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function LDX(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.registerX = value;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerX === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerX & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function LDY(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.registerY = value;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerY === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerY & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function LSR(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.status = cpu.status & 0xfe;
  if ((value & 0x01) === 0x01) {
    cpu.status = cpu.status | 0x01;
  }
  const result = value >> 1;
  cpu.write(address, result);
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
}

function NOP(): void {
  // No Operation
}

function ORA(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  cpu.accumulator = cpu.accumulator | value;
  cpu.status = cpu.status & 0xfe;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function PHA(cpu: ICPU): void {
  cpu.write(0x0100 + cpu.SP, cpu.accumulator);
  cpu.SP = cpu.SP - 1;
}

function PHP(cpu: ICPU): void {
  cpu.write(0x0100 + cpu.SP, cpu.status);
  cpu.SP = cpu.SP - 1;
}

function PLA(cpu: ICPU): void {
  cpu.SP = cpu.SP + 1;
  cpu.accumulator = cpu.read(0x0100 + cpu.SP);
  cpu.status = cpu.status & 0xfe;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function PLP(cpu: ICPU): void {
  cpu.SP = cpu.SP + 1;
  cpu.status = cpu.read(0x0100 + cpu.SP);
}

function ROL(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = (value << 1) | (cpu.status & 0x01);
  cpu.status = cpu.status & 0xfe;
  if ((value & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x01;
  }
  cpu.write(address, result);
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function ROR(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = (value >> 1) | ((cpu.status & 0x01) << 7);
  cpu.status = cpu.status & 0xfe;
  if ((value & 0x01) === 0x01) {
    cpu.status = cpu.status | 0x01;
  }
  cpu.write(address, result);
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function RTI(cpu: ICPU): void {
  cpu.SP = cpu.SP + 1;
  cpu.status = cpu.read(0x0100 + cpu.SP);
  cpu.SP = cpu.SP + 1;
  cpu.PC = cpu.read(0x0100 + cpu.SP);
  cpu.SP = cpu.SP + 1;
  cpu.PC = cpu.PC | (cpu.read(0x0100 + cpu.SP) << 8);
}

function RTS(cpu: ICPU): void {
  cpu.SP = cpu.SP + 1;
  cpu.PC = cpu.read(0x0100 + cpu.SP);
  cpu.SP = cpu.SP + 1;
  cpu.PC = cpu.PC | (cpu.read(0x0100 + cpu.SP) << 8);
  cpu.PC = cpu.PC + 1;
}

function SBC(cpu: ICPU, address: number): void {
  const value = cpu.read(address);
  const result = cpu.accumulator - value - (cpu.status & 0x01);
  cpu.status = cpu.status & 0xfe;
  if (result >= 0) {
    cpu.status = cpu.status | 0x01;
  }
  if (result === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((result & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
  cpu.accumulator = result & 0xff;
}

function SEC(cpu: ICPU): void {
  cpu.status = cpu.status | 0x01;
}

function SED(cpu: ICPU): void {
  cpu.status = cpu.status | 0x08;
}

function SEI(cpu: ICPU): void {
  cpu.status = cpu.status | 0x04;
}

function STA(cpu: ICPU, address: number): void {
  cpu.write(address, cpu.accumulator);
}

function STX(cpu: ICPU, address: number): void {
  cpu.write(address, cpu.registerX);
}

function STY(cpu: ICPU, address: number): void {
  cpu.write(address, cpu.registerY);
}

function TAX(cpu: ICPU): void {
  cpu.registerX = cpu.accumulator;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerX === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerX & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function TAY(cpu: ICPU): void {
  cpu.registerY = cpu.accumulator;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerY === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerY & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function TSX(cpu: ICPU): void {
  cpu.registerX = cpu.SP;
  cpu.status = cpu.status & 0xfe;
  if (cpu.registerX === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.registerX & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function TXA(cpu: ICPU): void {
  cpu.accumulator = cpu.registerX;
  cpu.status = cpu.status & 0xfe;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}

function TXS(cpu: ICPU): void {
  cpu.SP = cpu.registerX;
}

function TYA(cpu: ICPU): void {
  cpu.accumulator = cpu.registerY;
  cpu.status = cpu.status & 0xfe;
  if (cpu.accumulator === 0) {
    cpu.status = cpu.status | 0x02;
  }
  if ((cpu.accumulator & 0x80) === 0x80) {
    cpu.status = cpu.status | 0x80;
  }
}
