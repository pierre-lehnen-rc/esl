import { FreeSwitchEventEmitter } from './event-emitter.js';
import { FreeSwitchResponse } from './response.js';
import { type FreeSwitchParserError } from './parser.js';
type Logger = (msg: string, data?: unknown) => void;
export interface FreeSwitchClientLogger {
    debug: Logger;
    info: Logger;
    error: Logger;
}
interface FreeSwitchClientEvents {
    connect: (call: FreeSwitchResponse) => void;
    error: (error: unknown) => void;
    warning: (data: FreeSwitchParserError) => void;
    reconnecting: (retry_timeout: number) => void;
    end: () => void;
}
export declare class FreeSwitchClient extends FreeSwitchEventEmitter<keyof FreeSwitchClientEvents, FreeSwitchClientEvents> {
    private readonly options;
    private current_call;
    private running;
    private retry;
    private attempt;
    private readonly logger;
    /**
     * Create a new client that will attempt to connect to a FreeSWITCH Event Socket.
     * @param options.host default: `127.0.0.1`
     * @param options.port default: 8021
     * @param options.password default: `ClueCon`
     * @param options.logger default: `console` Object
     */
    constructor(options?: {
        host?: string;
        port: number;
        password?: string;
        logger?: FreeSwitchClientLogger;
    });
    connect(): void;
    end(): void;
}
export {};
//# sourceMappingURL=client.d.ts.map