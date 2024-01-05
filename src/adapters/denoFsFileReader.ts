import { IFileReader } from "./interfaces/IFileReader.ts";



export class DenoFsFileReader implements IFileReader {


    async read(path: string): Promise<Uint8Array> {
        const file = await Deno.open(path);
        const fileInfo = await Deno.fstat(file.rid);
        const data = new Uint8Array(fileInfo.size);
        await Deno.read(file.rid, data);
        Deno.close(file.rid);
        return data;
    }
}