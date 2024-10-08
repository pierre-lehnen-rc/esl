import { FreeSwitchEventEmitter } from './event-emitter.js';
import { FreeSwitchResponse } from './response.js';
type StringMap = Record<string, string | undefined>;
type Logger = (msg: string, data?: unknown) => void;
export interface FreeSwitchServerLogger {
    debug: Logger;
    info: Logger;
    error: Logger;
}
interface FreeSwitchServerConstructorOptions {
    all_events?: boolean;
    my_events?: boolean;
    logger?: FreeSwitchServerLogger;
}
interface FreeSwitchServerEvents {
    error: (error: Error) => void;
    drop: (data?: {
        localAddress?: string;
        localPort?: number;
        localFamily?: string;
        remoteAddress?: string;
        remotePort?: number;
        remoteFamily?: string;
    }) => void;
    connection: (call: FreeSwitchResponse, data: {
        uuid?: string;
        headers: StringMap;
        body: StringMap;
        data: StringMap;
    }) => void;
}
export declare class FreeSwitchServer extends FreeSwitchEventEmitter<keyof FreeSwitchServerEvents, FreeSwitchServerEvents> {
    stats: {
        error: bigint;
        drop: bigint;
        connection: bigint;
        connected: bigint;
        connection_error: bigint;
        connection_handled: bigint;
        connection_not_handled: bigint;
    };
    private readonly __server;
    private readonly logger;
    /**
     * Create a new Node.js server that will accept Event Socket connections from FreeSWITCH.
     * @param options.all_events request all events from FreeSWITCH. default: true
     * @param options.my_events filter out events not related to the current session. default: true
     * @param options.logger default: `console` Object
     */
    constructor(options?: FreeSwitchServerConstructorOptions);
    listen(options: {
        host?: string;
        port: number;
    }): Promise<void>;
    close(): Promise<void>;
    getConnectionCount(): Promise<number>;
    getMaxConnections(): number;
}
export {};
//# sourceMappingURL=server.d.ts.map