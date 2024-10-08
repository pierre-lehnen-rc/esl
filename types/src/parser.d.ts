/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { type Socket } from 'node:net';
export type StringMap = Record<string, string | undefined>;
export declare class FreeSwitchParserError extends Error {
    readonly error: string;
    readonly buffer: Buffer;
    constructor(error: string, buffer: Buffer);
}
type Processor = (headers: StringMap, body: string) => void;
export declare const FreeSwitchParser: (socket: Socket, process: Processor) => void;
export declare const parse_header_text: (header_text: string) => StringMap;
export {};
//# sourceMappingURL=parser.d.ts.map