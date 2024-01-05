import { ICPU } from "./interfaces/ICPU.ts";
import { IRAM } from "./interfaces/IRAM.ts";




import { CPUInstructions, CPUCycles } from "./cpuInstructions.ts";
import { CPUAddressingModes } from "./cpuAddressingModes.ts";



export class CPU implements ICPU{
    pc= 0;
    sp= 0;
    a= 0;
    x= 0;
    y= 0;
    cycles= 0;
    status= 0;

    constructor(public ram: IRAM){
        this.ram = ram;
    }


    step(): void {

        const opcode = this.read(this.pc);

        const instruction = CPUInstructions[opcode];

        CPUAddressingModes[opcode](this);

        instruction(this, this.read(this.pc));

        this.pc = this.pc + 1;

        this.cycles = this.cycles + CPUCycles[opcode];

    }

    read(address: number): number {
        return this.ram.read(address);
    }

    read16(address: number): number {
        return this.ram.read16(address);
    }

    write(address: number, data: number): void {
        this.ram.write(address, data);
    }

    write16(address: number, data: number): void {
        this.ram.write16(address, data);
    }
   

    reset(): void {
        this.pc = 0;
        this.sp = 0;
        this.a = 0;
        this.x = 0;
        this.y = 0;
        this.status = 0
        this.ram.reset();
    }
}

