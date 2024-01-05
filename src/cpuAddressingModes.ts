import { ICPU } from "./interfaces/ICPU.ts";


export const CPUAddressingModes: {[opcode: string]: ((cpu: ICPU) => void) | (() => void)} = {
    0x00: implied, 0x01: indexedIndirect, 0x05: zeroPage, 0x06: zeroPage, 0x08: implied, 0x09: immediate, 0x0A: accumulator, 0x0D: absolute, 0x0E: absolute, 0x10: relative,
    0x11: indirectIndexed, 0x15: zeroPageX, 0x16: zeroPageX, 0x18: implied, 0x19: absoluteY, 0x1D: absoluteX, 0x1E: absoluteX, 0x20: absolute, 0x21: indexedIndirect, 0x24: zeroPage,
    0x25: zeroPage, 0x26: zeroPage, 0x28: implied, 0x29: immediate, 0x2A: accumulator, 0x2C: absolute, 0x2D: absolute, 0x2E: absolute, 0x30: relative, 0x31: indirectIndexed,
    0x35: zeroPageX, 0x36: zeroPageX, 0x38: implied, 0x39: absoluteY, 0x3D: absoluteX, 0x3E: absoluteX, 0x40: implied, 0x41: indexedIndirect, 0x45: zeroPage, 0x46: zeroPage,
    0x48: implied, 0x49: immediate, 0x4A: accumulator, 0x4C: absolute, 0x4D: absolute, 0x4E: absolute, 0x50: relative, 0x51: indirectIndexed, 0x55: zeroPageX, 0x56: zeroPageX,
    0x58: implied, 0x59: absoluteY, 0x5D: absoluteX, 0x5E: absoluteX, 0x60: implied, 0x61: indexedIndirect, 0x65: zeroPage, 0x66: zeroPage, 0x68: implied, 0x69: immediate,
    0x6A: accumulator, 0x6C: indirect, 0x6D: absolute, 0x6E: absolute, 0x70: relative, 0x71: indirectIndexed, 0x75: zeroPageX, 0x76: zeroPageX, 0x78: implied, 0x79: absoluteY,
    0x7D: absoluteX, 0x7E: absoluteX, 0x81: indexedIndirect, 0x84: zeroPage, 0x85: zeroPage, 0x86: zeroPage, 0x88: implied, 0x8A: accumulator, 0x8C: absolute, 0x8D: absolute,
    0x8E: absolute, 0x90: relative, 0x91: indirectIndexed, 0x94: zeroPageX, 0x95: zeroPageX, 0x96: zeroPageY, 0x98: implied, 0x99: absoluteY, 0x9A: implied, 0x9D: absoluteX,
    0xA0: immediate, 0xA1: indexedIndirect, 0xA2: immediate, 0xA4: zeroPage, 0xA5: zeroPage, 0xA6: zeroPage, 0xA8: implied, 0xA9: immediate, 0xAA: accumulator, 0xAC: absolute,
    0xAD: absolute, 0xAE: absolute, 0xB0: relative, 0xB1: indirectIndexed, 0xB4: zeroPageX, 0xB5: zeroPageX, 0xB6: zeroPageY, 0xB8: implied, 0xB9: absoluteY, 0xBA: implied,
    0xBC: absoluteX, 0xBD: absoluteX, 0xBE: absoluteY, 0xC0: immediate, 0xC1: indexedIndirect, 0xC4: zeroPage, 0xC5: zeroPage, 0xC6: zeroPage, 0xC8: implied, 0xC9: immediate,
    0xCA: implied, 0xCC: absolute, 0xCD: absolute, 0xCE: absolute, 0xD0: relative, 0xD1: indirectIndexed, 0xD5: zeroPageX, 0xD6: zeroPageX, 0xD8: implied, 0xD9: absoluteY,
    0xDD: absoluteX, 0xDE: absoluteX, 0xE0: immediate, 0xE1: indexedIndirect, 0xE4: zeroPage, 0xE5: zeroPage, 0xE6: zeroPage, 0xE8: implied, 0xE9: immediate, 0xEA: implied,
    0xEC: absolute, 0xED: absolute, 0xEE: absolute, 0xF0: relative, 0xF1: indirectIndexed, 0xF5: zeroPageX, 0xF6: zeroPageX, 0xF8: implied, 0xF9: absoluteY, 0xFD: absoluteX,
    0xFE: absoluteX
 }


function implied(): number {
    return 0;
}

function accumulator(): number {
    return 0;
}

function immediate(cpu: ICPU): number {
    const address = cpu.pc;
    cpu.pc = cpu.pc + 1;
    return address;
}

function zeroPage(cpu: ICPU): number {
    const address = cpu.ram.read(cpu.pc);
    cpu.pc = cpu.pc + 1;
    return address;
}


function zeroPageX(cpu: ICPU): number {
    const address = (cpu.ram.read(cpu.pc) + cpu.x) & 0xFF;
    cpu.pc = cpu.pc + 1;
    return address;
}

function zeroPageY(cpu: ICPU): number {
    const address = (cpu.ram.read(cpu.pc) + cpu.y) & 0xFF;
    cpu.pc = cpu.pc + 1;
    return address;
}

function relative(cpu: ICPU): number {
    const address = cpu.ram.read(cpu.pc);
    cpu.pc = cpu.pc + 1;
    if((address & 0x80) === 0x80){
        return cpu.pc + (address - 256);
    }
    return cpu.pc + address;
}

function absolute(cpu: ICPU): number {
    const address = cpu.ram.read16(cpu.pc);
    cpu.pc = cpu.pc + 2;
    return address;
}

function absoluteX(cpu: ICPU): number {
    const address = cpu.ram.read16(cpu.pc) + cpu.x;
    cpu.pc = cpu.pc + 2;
    return address;
}

function absoluteY(cpu: ICPU): number {
    const address = cpu.ram.read16(cpu.pc) + cpu.y;
    cpu.pc = cpu.pc + 2;
    return address;
}

function indirect(cpu: ICPU): number {
    const address = cpu.ram.read16(cpu.pc);
    cpu.pc = cpu.pc + 2;
    return cpu.ram.read16(address);
}

function indexedIndirect(cpu: ICPU): number {
    const address = (cpu.ram.read(cpu.pc) + cpu.x) & 0xFF;
    cpu.pc = cpu.pc + 1;
    return cpu.ram.read16(address);
}

function indirectIndexed(cpu: ICPU): number {
    const address = cpu.ram.read(cpu.pc);
    cpu.pc = cpu.pc + 1;
    return cpu.ram.read16(address) + cpu.y;
}