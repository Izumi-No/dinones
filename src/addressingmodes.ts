import { ICPU } from "./cpu.ts";

export enum AddressingMode {
  NoneAddressing,
  Immediate,
  ZeroPage,
  ZeroPage_X,
  ZeroPage_Y,
  Absolute,
  Absolute_X,
  Absolute_Y,
  Indirect_X,
  Indirect_Y,
  Indirect,
  Relative,
  Accumulator,
  Implied,
  None,
}

export const addressingModeMap: { [opcode: number]: AddressingMode } = {
  0x00: AddressingMode.NoneAddressing,
  0xea: AddressingMode.NoneAddressing,

  0x69: AddressingMode.Immediate,
  0x65: AddressingMode.ZeroPage,
  0x75: AddressingMode.ZeroPage_X,
  0x6d: AddressingMode.Absolute,
  0x7d: AddressingMode.Absolute_X,
  0x79: AddressingMode.Absolute_Y,
  0x61: AddressingMode.Indirect_X,
  0x71: AddressingMode.Indirect_Y,

  0xe9: AddressingMode.Immediate,
  0xe5: AddressingMode.ZeroPage,
  0xf5: AddressingMode.ZeroPage_X,
  0xed: AddressingMode.Absolute,
  0xfd: AddressingMode.Absolute_X,
  0xf9: AddressingMode.Absolute_Y,
  0xe1: AddressingMode.Indirect_X,
  0xf1: AddressingMode.Indirect_Y,

  0x29: AddressingMode.Immediate,
  0x25: AddressingMode.ZeroPage,
  0x35: AddressingMode.ZeroPage_X,
  0x2d: AddressingMode.Absolute,
  0x3d: AddressingMode.Absolute_X,
  0x39: AddressingMode.Absolute_Y,
  0x21: AddressingMode.Indirect_X,
  0x31: AddressingMode.Indirect_Y,

  0x49: AddressingMode.Immediate,
  0x45: AddressingMode.ZeroPage,
  0x55: AddressingMode.ZeroPage_X,
  0x4d: AddressingMode.Absolute,
  0x5d: AddressingMode.Absolute_X,
  0x59: AddressingMode.Absolute_Y,
  0x41: AddressingMode.Indirect_X,
  0x51: AddressingMode.Indirect_Y,

  0x09: AddressingMode.Immediate,
  0x05: AddressingMode.ZeroPage,
  0x15: AddressingMode.ZeroPage_X,
  0x0d: AddressingMode.Absolute,
  0x1d: AddressingMode.Absolute_X,
  0x19: AddressingMode.Absolute_Y,
  0x01: AddressingMode.Indirect_X,
  0x11: AddressingMode.Indirect_Y,

  0x0a: AddressingMode.NoneAddressing,
  0x06: AddressingMode.ZeroPage,
  0x16: AddressingMode.ZeroPage_X,
  0x0e: AddressingMode.Absolute,
  0x1e: AddressingMode.Absolute_X,

  0x4a: AddressingMode.NoneAddressing,
  0x46: AddressingMode.ZeroPage,
  0x56: AddressingMode.ZeroPage_X,
  0x4e: AddressingMode.Absolute,
  0x5e: AddressingMode.Absolute_X,

  0x2a: AddressingMode.NoneAddressing,
  0x26: AddressingMode.ZeroPage,
  0x36: AddressingMode.ZeroPage_X,
  0x2e: AddressingMode.Absolute,
  0x3e: AddressingMode.Absolute_X,

  0x6a: AddressingMode.NoneAddressing,
  0x66: AddressingMode.ZeroPage,
  0x76: AddressingMode.ZeroPage_X,
  0x6e: AddressingMode.Absolute,
  0x7e: AddressingMode.Absolute_X,

  0xe6: AddressingMode.ZeroPage,
  0xf6: AddressingMode.ZeroPage_X,
  0xee: AddressingMode.Absolute,
  0xfe: AddressingMode.Absolute_X,

  0xe8: AddressingMode.NoneAddressing,
  0xc8: AddressingMode.NoneAddressing,

  0xc6: AddressingMode.ZeroPage,
  0xd6: AddressingMode.ZeroPage_X,
  0xce: AddressingMode.Absolute,
  0xde: AddressingMode.Absolute_X,

  0xca: AddressingMode.NoneAddressing,
  0x88: AddressingMode.NoneAddressing,

  0xc9: AddressingMode.Immediate,
  0xc5: AddressingMode.ZeroPage,
  0xd5: AddressingMode.ZeroPage_X,
  0xcd: AddressingMode.Absolute,
  0xdd: AddressingMode.Absolute_X,
  0xd9: AddressingMode.Absolute_Y,
  0xc1: AddressingMode.Indirect_X,
  0xd1: AddressingMode.Indirect_Y,

  0xc0: AddressingMode.Immediate,
  0xc4: AddressingMode.ZeroPage,
  0xcc: AddressingMode.Absolute,

  0xe0: AddressingMode.Immediate,
  0xe4: AddressingMode.ZeroPage,
  0xec: AddressingMode.Absolute,

  0x4c: AddressingMode.NoneAddressing,
  0x6c: AddressingMode.NoneAddressing,

  0x20: AddressingMode.NoneAddressing,
  0x60: AddressingMode.NoneAddressing,

  0x40: AddressingMode.NoneAddressing,

  0xd0: AddressingMode.NoneAddressing,
  0x70: AddressingMode.NoneAddressing,
  0x50: AddressingMode.NoneAddressing,
  0x30: AddressingMode.NoneAddressing,
  0xf0: AddressingMode.NoneAddressing,
  0xb0: AddressingMode.NoneAddressing,
  0x90: AddressingMode.NoneAddressing,
  0x10: AddressingMode.NoneAddressing,

  0x24: AddressingMode.ZeroPage,
  0x2c: AddressingMode.Absolute,

  0xa9: AddressingMode.Immediate,
  0xa5: AddressingMode.ZeroPage,
  0xb5: AddressingMode.ZeroPage_X,
  0xad: AddressingMode.Absolute,
  0xbd: AddressingMode.Absolute_X,
  0xb9: AddressingMode.Absolute_Y,
  0xa1: AddressingMode.Indirect_X,
  0xb1: AddressingMode.Indirect_Y,

  0xa2: AddressingMode.Immediate,
  0xa6: AddressingMode.ZeroPage,
  0xb6: AddressingMode.ZeroPage_Y,
  0xae: AddressingMode.Absolute,
  0xbe: AddressingMode.Absolute_Y,

  0xa0: AddressingMode.Immediate,
  0xa4: AddressingMode.ZeroPage,
  0xb4: AddressingMode.ZeroPage_X,
  0xac: AddressingMode.Absolute,
  0xbc: AddressingMode.Absolute_X,

  0x85: AddressingMode.ZeroPage,
  0x95: AddressingMode.ZeroPage_X,
  0x8d: AddressingMode.Absolute,
  0x9d: AddressingMode.Absolute_X,
  0x99: AddressingMode.Absolute_Y,
  0x81: AddressingMode.Indirect_X,
  0x91: AddressingMode.Indirect_Y,

  0x86: AddressingMode.ZeroPage,
  0x96: AddressingMode.ZeroPage_Y,
  0x8e: AddressingMode.Absolute,

  0x84: AddressingMode.ZeroPage,
  0x94: AddressingMode.ZeroPage_X,
  0x8c: AddressingMode.Absolute,

  0xd8: AddressingMode.NoneAddressing,
  0x58: AddressingMode.NoneAddressing,
  0xb8: AddressingMode.NoneAddressing,
  0x18: AddressingMode.NoneAddressing,
  0x38: AddressingMode.NoneAddressing,
  0x78: AddressingMode.NoneAddressing,
  0xf8: AddressingMode.NoneAddressing,

  0xaa: AddressingMode.NoneAddressing,
  0xa8: AddressingMode.NoneAddressing,
  0xba: AddressingMode.NoneAddressing,
  0x8a: AddressingMode.NoneAddressing,
  0x9a: AddressingMode.NoneAddressing,
  0x98: AddressingMode.NoneAddressing,

  0x48: AddressingMode.NoneAddressing,
  0x68: AddressingMode.NoneAddressing,
  0x08: AddressingMode.NoneAddressing,
  0x28: AddressingMode.NoneAddressing,

  0xc7: AddressingMode.ZeroPage,
  0xd7: AddressingMode.ZeroPage_X,
  0xcf: AddressingMode.Absolute,
  0xdf: AddressingMode.Absolute_X,
  0xdb: AddressingMode.Absolute_Y,
  0xd3: AddressingMode.Indirect_Y,
  0xc3: AddressingMode.Indirect_X,

  0x27: AddressingMode.ZeroPage,
  0x37: AddressingMode.ZeroPage_X,
  0x2f: AddressingMode.Absolute,
  0x3f: AddressingMode.Absolute_X,
  0x3b: AddressingMode.Absolute_Y,
  0x33: AddressingMode.Indirect_Y,
  0x23: AddressingMode.Indirect_X,

  0x07: AddressingMode.ZeroPage,
  0x17: AddressingMode.ZeroPage_X,
  0x0f: AddressingMode.Absolute,
  0x1f: AddressingMode.Absolute_X,
  0x1b: AddressingMode.Absolute_Y,
  0x03: AddressingMode.Indirect_X,
  0x13: AddressingMode.Indirect_Y,

  0x47: AddressingMode.ZeroPage,
  0x57: AddressingMode.ZeroPage_X,
  0x4f: AddressingMode.Absolute,
  0x5f: AddressingMode.Absolute_X,
  0x5b: AddressingMode.Absolute_Y,
  0x43: AddressingMode.Indirect_X,
  0x53: AddressingMode.Indirect_Y,

  0x80: AddressingMode.Immediate,
  0x82: AddressingMode.Immediate,
  0x89: AddressingMode.Immediate,
  0xc2: AddressingMode.Immediate,
  0xe2: AddressingMode.Immediate,

  0xcb: AddressingMode.Immediate,

  0x6b: AddressingMode.Immediate,

  0xeb: AddressingMode.Immediate,

  0x0b: AddressingMode.Immediate,
  0x2b: AddressingMode.Immediate,

  0x4b: AddressingMode.Immediate,

  0x04: AddressingMode.ZeroPage,
  0x44: AddressingMode.ZeroPage,
  0x64: AddressingMode.ZeroPage,
  0x14: AddressingMode.ZeroPage_X,
  0x34: AddressingMode.ZeroPage_X,
  0x54: AddressingMode.ZeroPage_X,
  0x74: AddressingMode.ZeroPage_X,
  0xd4: AddressingMode.ZeroPage_X,
  0xf4: AddressingMode.ZeroPage_X,
  0x0c: AddressingMode.Absolute,
  0x1c: AddressingMode.Absolute_X,
  0x3c: AddressingMode.Absolute_X,
  0x5c: AddressingMode.Absolute_X,
  0x7c: AddressingMode.Absolute_X,
  0xdc: AddressingMode.Absolute_X,
  0xfc: AddressingMode.Absolute_X,

  0x67: AddressingMode.ZeroPage,
  0x77: AddressingMode.ZeroPage_X,
  0x6f: AddressingMode.Absolute,
  0x7f: AddressingMode.Absolute_X,
  0x7b: AddressingMode.Absolute_Y,
  0x63: AddressingMode.Indirect_X,
  0x73: AddressingMode.Indirect_Y,

  0xe7: AddressingMode.ZeroPage,
  0xf7: AddressingMode.ZeroPage_X,
  0xef: AddressingMode.Absolute,
  0xff: AddressingMode.Absolute_X,
  0xfb: AddressingMode.Absolute_Y,
  0xe3: AddressingMode.Indirect_X,
  0xf3: AddressingMode.Indirect_Y,

  0x02: AddressingMode.NoneAddressing,
  0x12: AddressingMode.NoneAddressing,
  0x22: AddressingMode.NoneAddressing,
  0x32: AddressingMode.NoneAddressing,
  0x42: AddressingMode.NoneAddressing,
  0x52: AddressingMode.NoneAddressing,
  0x62: AddressingMode.NoneAddressing,
  0x72: AddressingMode.NoneAddressing,
  0x92: AddressingMode.NoneAddressing,
  0xb2: AddressingMode.NoneAddressing,
  0xd2: AddressingMode.NoneAddressing,
  0xf2: AddressingMode.NoneAddressing,

  0x1a: AddressingMode.NoneAddressing,
  0x3a: AddressingMode.NoneAddressing,
  0x5a: AddressingMode.NoneAddressing,
  0x7a: AddressingMode.NoneAddressing,
  0xda: AddressingMode.NoneAddressing,

  0xfa: AddressingMode.NoneAddressing,

  0xab: AddressingMode.Immediate,

  0x8b: AddressingMode.Immediate,
  0xbb: AddressingMode.Absolute_Y,
  0x9b: AddressingMode.Absolute_Y,
  0x93: AddressingMode.Indirect_Y,
  0x9f: AddressingMode.Absolute_Y,
  0x9e: AddressingMode.Absolute_Y,
  0x9c: AddressingMode.Absolute_X,

  0xa7: AddressingMode.ZeroPage,
  0xb7: AddressingMode.ZeroPage_Y,
  0xaf: AddressingMode.Absolute,
  0xbf: AddressingMode.Absolute_Y,
  0xa3: AddressingMode.Indirect_X,
  0xb3: AddressingMode.Indirect_Y,

  0x87: AddressingMode.ZeroPage,
  0x97: AddressingMode.ZeroPage_Y,
  0x8f: AddressingMode.Absolute,
  0x83: AddressingMode.Indirect_X,
};

export function immediate(cpu: ICPU): number {
  return cpu.read(cpu.PC++);
}

export function zeroPage(cpu: ICPU): number {
  return cpu.read(cpu.read(cpu.PC++));
}

export function zeroPageX(cpu: ICPU): number {
  return cpu.read((cpu.read(cpu.PC++) + cpu.registerX) & 0xff);
}

export function zeroPageY(cpu: ICPU): number {
  return cpu.read((cpu.read(cpu.PC++) + cpu.registerY) & 0xff);
}

export function absolute(cpu: ICPU): number {
  return cpu.read(cpu.read16(cpu.PC++));
}

export function absoluteX(cpu: ICPU): number {
  return cpu.read(cpu.read16(cpu.PC++) + cpu.registerX);
}

export function absoluteY(cpu: ICPU): number {
  return cpu.read(cpu.read16(cpu.PC++) + cpu.registerY);
}

export function indirectX(cpu: ICPU): number {
  return cpu.read(cpu.read16((cpu.read(cpu.PC++) + cpu.registerX) & 0xff));
}

export function indirectY(cpu: ICPU): number {
  return cpu.read(cpu.read16(cpu.read(cpu.PC++)) + cpu.registerY);
}

export function indirect(cpu: ICPU): number {
  return cpu.read(cpu.read16(cpu.read16(cpu.PC++)));
}

export function relative(cpu: ICPU): number {
  return cpu.read(cpu.PC++);
}

export function accumulator(cpu: ICPU): number {
  return cpu.accumulator;
}

export function implied(cpu: ICPU): number {
  return 0;
}

export function none(cpu: ICPU): number {
  return 0;
}

export const addressingModeRecord: Record<AddressingMode, Function> = {
  [AddressingMode.NoneAddressing]: none,
  [AddressingMode.Immediate]: immediate,
  [AddressingMode.ZeroPage]: zeroPage,
  [AddressingMode.ZeroPage_X]: zeroPageX,
  [AddressingMode.ZeroPage_Y]: zeroPageY,
  [AddressingMode.Absolute]: absolute,
  [AddressingMode.Absolute_X]: absoluteX,
  [AddressingMode.Absolute_Y]: absoluteY,
  [AddressingMode.Indirect_X]: indirectX,
  [AddressingMode.Indirect_Y]: indirectY,
  [AddressingMode.Indirect]: indirect,
  [AddressingMode.Relative]: relative,
  [AddressingMode.Accumulator]: accumulator,
  [AddressingMode.Implied]: implied,
  [AddressingMode.None]: none,
};

export const cyclesMap: { [opcode: string]: number } = {
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
