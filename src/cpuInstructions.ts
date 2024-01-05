
import { ICPU } from "./interfaces/ICPU.ts";


export const CPUInstructions: {[opcode: string]: ((cpu: ICPU, address: number) => void) | ((cpu: ICPU) => void) | (() => void)} = {
    0x00: BRK, 0x01: ORA, 0x05: ORA, 0x06: ASL, 0x08: PHP, 0x09: ORA, 0x0A: ASL, 0x0D: ORA, 0x0E: ASL, 0x10: BPL,
    0x11: ORA, 0x15: ORA, 0x16: ASL, 0x18: CLC, 0x19: ORA, 0x1D: ORA, 0x1E: ASL, 0x20: JSR, 0x21: AND, 0x24: BIT,
    0x25: AND, 0x26: ROL, 0x28: PLP, 0x29: AND, 0x2A: ROL, 0x2C: BIT, 0x2D: AND, 0x2E: ROL, 0x30: BMI, 0x31: AND,
    0x35: AND, 0x36: ROL, 0x38: SEC, 0x39: AND, 0x3D: AND, 0x3E: ROL, 0x40: RTI, 0x41: EOR, 0x45: EOR, 0x46: LSR,
    0x48: PHA, 0x49: EOR, 0x4A: LSR, 0x4C: JMP, 0x4D: EOR, 0x4E: LSR, 0x50: BVC, 0x51: EOR, 0x55: EOR, 0x56: LSR,
    0x58: CLI, 0x59: EOR, 0x5D: EOR, 0x5E: LSR, 0x60: RTS, 0x61: ADC, 0x65: ADC, 0x66: ROR, 0x68: PLA, 0x69: ADC,
    0x6A: ROR, 0x6C: JMP, 0x6D: ADC, 0x6E: ROR, 0x70: BVS, 0x71: ADC, 0x75: ADC, 0x76: ROR, 0x78: SEI, 0x79: ADC,
    0x7D: ADC, 0x7E: ROR, 0x81: STA, 0x84: STY, 0x85: STA, 0x86: STX, 0x88: DEY, 0x8A: TXA, 0x8C: STY, 0x8D: STA,
    0x8E: STX, 0x90: BCC, 0x91: STA, 0x94: STY, 0x95: STA, 0x96: STX, 0x98: TYA, 0x99: STA, 0x9A: TXS, 0x9D: STA,
    0xA0: LDY, 0xA1: LDA, 0xA2: LDX, 0xA4: LDY, 0xA5: LDA, 0xA6: LDX, 0xA8: TAY, 0xA9: LDA, 0xAA: TAX, 0xAC: LDY,
    0xAD: LDA, 0xAE: LDX, 0xB0: BCS, 0xB1: LDA, 0xB4: LDY, 0xB5: LDA, 0xB6: LDX, 0xB8: CLV, 0xB9: LDA, 0xBA: TSX,
    0xBC: LDY, 0xBD: LDA, 0xBE: LDX, 0xC0: CPY, 0xC1: CMP, 0xC4: CPY, 0xC5: CMP, 0xC6: DEC, 0xC8: INY, 0xC9: CMP,
    0xCA: DEX, 0xCC: CPY, 0xCD: CMP, 0xCE: DEC, 0xD0: BNE, 0xD1: CMP, 0xD5: CMP, 0xD6: DEC, 0xD8: CLD, 0xD9: CMP,
    0xDD: CMP, 0xDE: DEC, 0xE0: CPX, 0xE1: SBC, 0xE4: CPX, 0xE5: SBC, 0xE6: INC, 0xE8: INX, 0xE9: SBC, 0xEA: NOP,
    0xEC: CPX, 0xED: SBC, 0xEE: INC, 0xF0: BEQ, 0xF1: SBC, 0xF5: SBC, 0xF6: INC, 0xF8: SED, 0xF9: SBC, 0xFD: SBC,
    0xFE: INC
}


export const CPUCycles: {[opcode: string]: number} = {
    0x00: 7, 0x01: 6, 0x05: 3, 0x06: 5, 0x08: 3, 0x09: 2, 0x0A: 2, 0x0D: 4, 0x0E: 6, 0x10: 2,
    0x11: 5, 0x15: 4, 0x16: 6, 0x18: 2, 0x19: 4, 0x1D: 4, 0x1E: 7, 0x20: 6, 0x21: 6, 0x24: 3,
    0x25: 3, 0x26: 5, 0x28: 4, 0x29: 2, 0x2A: 2, 0x2C: 4, 0x2D: 4, 0x2E: 6, 0x30: 2, 0x31: 5,
    0x35: 4, 0x36: 6, 0x38: 2, 0x39: 4, 0x3D: 4, 0x3E: 7, 0x40: 6, 0x41: 6, 0x45: 3, 0x46: 5,
    0x48: 3, 0x49: 2, 0x4A: 2, 0x4C: 3, 0x4D: 4, 0x4E: 6, 0x50: 2, 0x51: 5, 0x55: 4, 0x56: 6,
    0x58: 2, 0x59: 4, 0x5D: 4, 0x5E: 7, 0x60: 6, 0x61: 6, 0x65: 3, 0x66: 5, 0x68: 4, 0x69: 2,
    0x6A: 2, 0x6C: 5, 0x6D: 4, 0x6E: 6, 0x70: 2, 0x71: 5, 0x75: 4, 0x76: 6, 0x78: 2, 0x79: 4,
    0x7D: 4, 0x7E: 7, 0x81: 6, 0x84: 3, 0x85: 3, 0x86: 3, 0x88: 2, 0x8A: 2, 0x8C: 4, 0x8D: 4,
    0x8E: 4, 0x90: 2, 0x91: 6, 0x94: 4, 0x95: 4, 0x96: 4, 0x98: 2, 0x99: 5, 0x9A: 2, 0x9D: 5,
    0xA0: 2, 0xA1: 6, 0xA2: 2, 0xA4: 3, 0xA5: 3, 0xA6: 3, 0xA8: 2, 0xA9: 2, 0xAA: 2, 0xAC: 4,
    0xAD: 4, 0xAE: 4, 0xB0: 2, 0xB1: 5, 0xB4: 4, 0xB5: 4, 0xB6: 4, 0xB8: 2, 0xB9: 4, 0xBA: 2,
    0xBC: 4, 0xBD: 4, 0xBE: 4, 0xC0: 2, 0xC1: 6, 0xC4: 3, 0xC5: 3, 0xC6: 5, 0xC8: 2, 0xC9: 2,
    0xCA: 2, 0xCC: 4, 0xCD: 4, 0xCE: 6, 0xD0: 2, 0xD1: 5, 0xD5: 4, 0xD6: 6, 0xD8: 2, 0xD9: 4,
    0xDD: 4, 0xDE: 7, 0xE0: 2, 0xE1: 6, 0xE4: 3, 0xE5: 3, 0xE6: 5, 0xE8: 2, 0xE9: 2, 0xEA: 2,
    0xEC: 4, 0xED: 4, 0xEE: 6, 0xF0: 2, 0xF1: 5, 0xF5: 4, 0xF6: 6, 0xF8: 2, 0xF9: 4, 0xFD: 4,
    0xFE: 7
}
 

 function ADC(cpu: ICPU, address: number): void {
    const value = cpu.ram.read(address);
    const result = cpu.a + value + (cpu.status & 0x01);
    cpu.status = cpu.status & 0xFE;
    if(result > 255){
        cpu.status = cpu.status | 0x01;
    }
    cpu.a = result & 0xFF;
    if(cpu.a === 0){
        cpu.status = cpu.status | 0x02;
    }
    if((cpu.a & 0x80) === 0x80){
        cpu.status = cpu.status | 0x80;
    }
}

 function AND(cpu: ICPU, address: number): void {
    const value = cpu.ram.read(address);
    cpu.a = cpu.a & value;
    if(cpu.a === 0){
        cpu.status = cpu.status | 0x02;
    }
    if((cpu.a & 0x80) === 0x80){
        cpu.status = cpu.status | 0x80;
    }
}

 function ASL(cpu: ICPU, address: number): void {
    const value = cpu.ram.read(address);
    cpu.status = cpu.status & 0xFE;
    if((value & 0x80) === 0x80){
        cpu.status = cpu.status | 0x01;
    }
    const result = value << 1;
    cpu.ram.write(address, result);
    if((result & 0x80) === 0x80){
        cpu.status = cpu.status | 0x80;
    }
    if(result === 0){
        cpu.status = cpu.status | 0x02;
    }
}

 function BCC(cpu: ICPU, address: number): void {
    if((cpu.status & 0x01) === 0x00){
        cpu.pc = address;
    }
}

 function BCS(cpu: ICPU, address: number): void {
    if((cpu.status & 0x01) === 0x01){
        cpu.pc = address;
    }
}

 function BEQ(cpu: ICPU, address: number): void {
    if((cpu.status & 0x02) === 0x02){
        cpu.pc = address;
    }
}

 function BIT(cpu: ICPU, address: number): void {
    const value = cpu.ram.read(address);
    const result = cpu.a & value;
    cpu.status = cpu.status & 0x3D;
    if((result & 0x80) === 0x80){
        cpu.status = cpu.status | 0x80;
    }
    if((result & 0x40) === 0x40){
        cpu.status = cpu.status | 0x40;
    }
    if(result === 0){
        cpu.status = cpu.status | 0x02;
    }
}

 function BMI(cpu: ICPU, address: number): void {
    if((cpu.status & 0x80) === 0x80){
        cpu.pc = address;
    }
}

 function BNE(cpu: ICPU, address: number): void {
    if((cpu.status & 0x02) === 0x00){
        cpu.pc = address;
    }
}

 function BPL(cpu: ICPU, address: number): void {
    if((cpu.status & 0x80) === 0x00){
        cpu.pc = address;
    }
}

    function BRK(cpu: ICPU, address: number): void {
        cpu.pc = cpu.pc + 1;
        cpu.ram.write(0x0100 + cpu.sp, (cpu.pc >> 8) & 0xFF);
        cpu.sp = cpu.sp - 1;
        cpu.ram.write(0x0100 + cpu.sp, cpu.pc & 0xFF);
        cpu.sp = cpu.sp - 1;
        cpu.ram.write(0x0100 + cpu.sp, cpu.status);
        cpu.sp = cpu.sp - 1;
        cpu.status = cpu.status | 0x10;
        cpu.pc = cpu.ram.read16(0xFFFE);
    }
    
    function BVC(cpu: ICPU, address: number): void {
        if((cpu.status & 0x40) === 0x00){
            cpu.pc = address;
        }
    }
    
    function BVS(cpu: ICPU, address: number): void {
        if((cpu.status & 0x40) === 0x40){
            cpu.pc = address;
        }
    }
    
    function CLC(cpu: ICPU): void {
        cpu.status = cpu.status & 0xFE;
    }
    
    function CLD(cpu: ICPU): void {
        cpu.status = cpu.status & 0xF7;
    }
    
    function CLI(cpu: ICPU): void {
        cpu.status = cpu.status & 0xFB;
    }
    
    function CLV(cpu: ICPU): void {
        cpu.status = cpu.status & 0xBF;
    }
    
    function CMP(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = cpu.a - value;
        cpu.status = cpu.status & 0xFE;
        if(result >= 0){
            cpu.status = cpu.status | 0x01;
        }
        if(result === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }
    
    function CPX(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = cpu.x - value;
        cpu.status = cpu.status & 0xFE;
        if(result >= 0){
            cpu.status = cpu.status | 0x01;
        }
        if(result === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function CPY(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = cpu.y - value;
        cpu.status = cpu.status & 0xFE;
        if(result >= 0){
            cpu.status = cpu.status | 0x01;
        }
        if(result === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function DEC(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = value - 1;
        cpu.ram.write(address, result);
        cpu.status = cpu.status & 0xFE;
        if(result === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function DEX(cpu: ICPU): void {
        cpu.x = cpu.x - 1;
        cpu.status = cpu.status & 0xFE;
        if(cpu.x === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.x & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function DEY(cpu: ICPU): void {
        cpu.y = cpu.y - 1;
        cpu.status = cpu.status & 0xFE;
        if(cpu.y === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.y & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function EOR(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        cpu.a = cpu.a ^ value;
        cpu.status = cpu.status & 0xFE;
        if(cpu.a === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.a & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function INC(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = value + 1;
        cpu.ram.write(address, result);
        cpu.status = cpu.status & 0xFE;
        if(result === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function INX(cpu: ICPU): void {
        cpu.x = cpu.x + 1;
        cpu.status = cpu.status & 0xFE;
        if(cpu.x === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.x & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function INY(cpu: ICPU): void {
        cpu.y = cpu.y + 1;
        cpu.status = cpu.status & 0xFE;
        if(cpu.y === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.y & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function JMP(cpu: ICPU, address: number): void {
        cpu.pc = address;
    }

    function JSR(cpu: ICPU, address: number): void {
        cpu.pc = cpu.pc - 1;
        cpu.ram.write(0x0100 + cpu.sp, (cpu.pc >> 8) & 0xFF);
        cpu.sp = cpu.sp - 1;
        cpu.ram.write(0x0100 + cpu.sp, cpu.pc & 0xFF);
        cpu.sp = cpu.sp - 1;
        cpu.pc = address;
    }

    function LDA(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        cpu.a = value;
        cpu.status = cpu.status & 0xFE;
        if(cpu.a === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.a & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function LDX(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        cpu.x = value;
        cpu.status = cpu.status & 0xFE;
        if(cpu.x === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.x & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function LDY(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        cpu.y = value;
        cpu.status = cpu.status & 0xFE;
        if(cpu.y === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.y & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function LSR(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        cpu.status = cpu.status & 0xFE;
        if((value & 0x01) === 0x01){
            cpu.status = cpu.status | 0x01;
        }
        const result = value >> 1;
        cpu.ram.write(address, result);
        if(result === 0){
            cpu.status = cpu.status | 0x02;
        }
    }

    function NOP(): void {
        // No Operation
    }

    function ORA(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        cpu.a = cpu.a | value;
        cpu.status = cpu.status & 0xFE;
        if(cpu.a === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.a & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function PHA(cpu: ICPU): void {
        cpu.ram.write(0x0100 + cpu.sp, cpu.a);
        cpu.sp = cpu.sp - 1;
    }

    function PHP(cpu: ICPU): void {
        cpu.ram.write(0x0100 + cpu.sp, cpu.status);
        cpu.sp = cpu.sp - 1;
    }

    function PLA(cpu: ICPU): void {
        cpu.sp = cpu.sp + 1;
        cpu.a = cpu.ram.read(0x0100 + cpu.sp);
        cpu.status = cpu.status & 0xFE;
        if(cpu.a === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.a & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function PLP(cpu: ICPU): void {
        cpu.sp = cpu.sp + 1;
        cpu.status = cpu.ram.read(0x0100 + cpu.sp);
    }

    function ROL(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = (value << 1) | (cpu.status & 0x01);
        cpu.status = cpu.status & 0xFE;
        if((value & 0x80) === 0x80){
            cpu.status = cpu.status | 0x01;
        }
        cpu.ram.write(address, result);
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function ROR(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = (value >> 1) | ((cpu.status & 0x01) << 7);
        cpu.status = cpu.status & 0xFE;
        if((value & 0x01) === 0x01){
            cpu.status = cpu.status | 0x01;
        }
        cpu.ram.write(address, result);
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function RTI(cpu: ICPU): void {
        cpu.sp = cpu.sp + 1;
        cpu.status = cpu.ram.read(0x0100 + cpu.sp);
        cpu.sp = cpu.sp + 1;
        cpu.pc = cpu.ram.read(0x0100 + cpu.sp);
        cpu.sp = cpu.sp + 1;
        cpu.pc = cpu.pc | (cpu.ram.read(0x0100 + cpu.sp) << 8);
    }

    function RTS(cpu: ICPU): void {
        cpu.sp = cpu.sp + 1;
        cpu.pc = cpu.ram.read(0x0100 + cpu.sp);
        cpu.sp = cpu.sp + 1;
        cpu.pc = cpu.pc | (cpu.ram.read(0x0100 + cpu.sp) << 8);
        cpu.pc = cpu.pc + 1;
    }

    function SBC(cpu: ICPU, address: number): void {
        const value = cpu.ram.read(address);
        const result = cpu.a - value - (cpu.status & 0x01);
        cpu.status = cpu.status & 0xFE;
        if(result >= 0){
            cpu.status = cpu.status | 0x01;
        }
        if(result === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((result & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
        cpu.a = result & 0xFF;
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
        cpu.ram.write(address, cpu.a);
    }

    function STX(cpu: ICPU, address: number): void {
        cpu.ram.write(address, cpu.x);
    }

    function STY(cpu: ICPU, address: number): void {
        cpu.ram.write(address, cpu.y);
    }

    function TAX(cpu: ICPU): void {
        cpu.x = cpu.a;
        cpu.status = cpu.status & 0xFE;
        if(cpu.x === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.x & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function TAY(cpu: ICPU): void {
        cpu.y = cpu.a;
        cpu.status = cpu.status & 0xFE;
        if(cpu.y === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.y & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function TSX(cpu: ICPU): void {
        cpu.x = cpu.sp;
        cpu.status = cpu.status & 0xFE;
        if(cpu.x === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.x & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function TXA(cpu: ICPU): void {
        cpu.a = cpu.x;
        cpu.status = cpu.status & 0xFE;
        if(cpu.a === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.a & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }

    function TXS(cpu: ICPU): void {
        cpu.sp = cpu.x;
    }

    function TYA(cpu: ICPU): void {
        cpu.a = cpu.y;
        cpu.status = cpu.status & 0xFE;
        if(cpu.a === 0){
            cpu.status = cpu.status | 0x02;
        }
        if((cpu.a & 0x80) === 0x80){
            cpu.status = cpu.status | 0x80;
        }
    }










