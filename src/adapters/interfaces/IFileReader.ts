
export interface IFileReader {
    read(path: string): Promise<Uint8Array>
}