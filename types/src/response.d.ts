/// <reference types="node" resolution-mode="require"/>
import { FreeSwitchEventEmitter } from './event-emitter.js';
import { type Socket } from 'node:net';
type StringMap = Record<string, string | undefined>;
type ResponseLogger = (msg: string, data: {
    ref: string;
    [key: string]: unknown;
}) => void;
export interface FreeSwitchResponseLogger {
    debug: ResponseLogger;
    info: ResponseLogger;
    error: ResponseLogger;
}
export declare class FreeSwitchError extends Error {
    readonly res: FreeSwitchEventData | {
        headers: StringMap;
        body: string;
    } | undefined;
    readonly args: Record<string, string | StringMap | undefined>;
    constructor(res: FreeSwitchEventData | {
        headers: StringMap;
        body: string;
    } | undefined, args: Record<string, string | StringMap | undefined>);
    toString(): string;
}
export declare class FreeSwitchUnhandledContentTypeError extends Error {
    readonly content_type: string;
    constructor(content_type: string);
    toString(): string;
}
export declare class FreeSwitchMissingContentTypeError extends Error {
    readonly headers: StringMap;
    readonly body: string;
    constructor(headers: StringMap, body: string);
    toString(): string;
}
export declare class FreeSwitchMissingEventNameError extends Error {
    readonly headers: StringMap;
    readonly body: string;
    constructor(headers: StringMap, body: string);
    toString(): string;
}
export declare class FreeSwitchTimeout extends Error {
    readonly timeout: number;
    readonly text: string;
    constructor(timeout: number, text: string);
    toString(): string;
}
type EventName = 'CUSTOM' | 'CLONE' | 'CHANNEL_CREATE' | 'CHANNEL_DESTROY' | 'CHANNEL_STATE' | 'CHANNEL_CALLSTATE' | 'CHANNEL_ANSWER' | 'CHANNEL_HANGUP' | 'CHANNEL_HANGUP_COMPLETE' | 'CHANNEL_EXECUTE' | 'CHANNEL_EXECUTE_COMPLETE' | 'CHANNEL_HOLD' | 'CHANNEL_UNHOLD' | 'CHANNEL_BRIDGE' | 'CHANNEL_UNBRIDGE' | 'CHANNEL_PROGRESS' | 'CHANNEL_PROGRESS_MEDIA' | 'CHANNEL_OUTGOING' | 'CHANNEL_PARK' | 'CHANNEL_UNPARK' | 'CHANNEL_APPLICATION' | 'CHANNEL_ORIGINATE' | 'CHANNEL_UUID' | 'API' | 'LOG' | 'INBOUND_CHAN' | 'OUTBOUND_CHAN' | 'STARTUP' | 'SHUTDOWN' | 'PUBLISH' | 'UNPUBLISH' | 'TALK' | 'NOTALK' | 'SESSION_CRASH' | 'MODULE_LOAD' | 'MODULE_UNLOAD' | 'DTMF' | 'MESSAGE' | 'PRESENCE_IN' | 'NOTIFY_IN' | 'PRESENCE_OUT' | 'PRESENCE_PROBE' | 'MESSAGE_WAITING' | 'MESSAGE_QUERY' | 'ROSTER' | 'CODEC' | 'BACKGROUND_JOB' | 'DETECTED_SPEECH' | 'DETECTED_TONE' | 'PRIVATE_COMMAND' | 'HEARTBEAT' | 'TRAP' | 'ADD_SCHEDULE' | 'DEL_SCHEDULE' | 'EXE_SCHEDULE' | 'RE_SCHEDULE' | 'RELOADXML' | 'NOTIFY' | 'PHONE_FEATURE' | 'PHONE_FEATURE_SUBSCRIBE' | 'SEND_MESSAGE' | 'RECV_MESSAGE' | 'REQUEST_PARAMS' | 'CHANNEL_DATA' | 'GENERAL' | 'COMMAND' | 'SESSION_HEARTBEAT' | 'CLIENT_DISCONNECTED' | 'SERVER_DISCONNECTED' | 'SEND_INFO' | 'RECV_INFO' | 'RECV_RTCP_MESSAGE' | 'SEND_RTCP_MESSAGE' | 'CALL_SECURE' | 'NAT' | 'RECORD_START' | 'RECORD_STOP' | 'PLAYBACK_START' | 'PLAYBACK_STOP' | 'CALL_UPDATE' | 'FAILURE' | 'SOCKET_DATA' | 'MEDIA_BUG_START' | 'MEDIA_BUG_STOP' | 'CONFERENCE_DATA_QUERY' | 'CONFERENCE_DATA' | 'CALL_SETUP_REQ' | 'CALL_SETUP_RESULT' | 'CALL_DETAIL' | 'DEVICE_STATE' | 'TEXT' | 'SHUTDOWN_REQUESTED' | 'ALL';
export interface FreeSwitchEventData {
    headers: StringMap;
    body: StringMap;
}
type SendResult = Promise<FreeSwitchEventData>;
interface FreeSwitchResponseEvents {
    'socket.close': () => void;
    'socket.error': (err: Error) => void;
    'socket.write': (err: Error) => void;
    'socket.end': (err: Error) => void;
    'error.missing-content-type': (err: FreeSwitchMissingContentTypeError) => void;
    'error.unhandled-content-type': (err: FreeSwitchUnhandledContentTypeError) => void;
    'error.invalid-json': (err: Error) => void;
    'error.missing-event-name': (err: FreeSwitchMissingEventNameError) => void;
    'cleanup_linger': () => void;
    'freeswitch_log_data': (data: {
        headers: StringMap;
        body: string;
    }) => void;
    'freeswitch_disconnect_notice': (data: {
        headers: StringMap;
        body: string;
    }) => void;
    'freeswitch_rude_rejection': (data: {
        headers: StringMap;
        body: string;
    }) => void;
    'CUSTOM': (data: FreeSwitchEventData) => void;
    'CLONE': (data: FreeSwitchEventData) => void;
    'CHANNEL_CREATE': (data: FreeSwitchEventData) => void;
    'CHANNEL_DESTROY': (data: FreeSwitchEventData) => void;
    'CHANNEL_STATE': (data: FreeSwitchEventData) => void;
    'CHANNEL_CALLSTATE': (data: FreeSwitchEventData) => void;
    'CHANNEL_ANSWER': (data: FreeSwitchEventData) => void;
    'CHANNEL_HANGUP': (data: FreeSwitchEventData) => void;
    'CHANNEL_HANGUP_COMPLETE': (data: FreeSwitchEventData) => void;
    'CHANNEL_EXECUTE': (data: FreeSwitchEventData) => void;
    'CHANNEL_EXECUTE_COMPLETE': (data: FreeSwitchEventData) => void;
    'CHANNEL_HOLD': (data: FreeSwitchEventData) => void;
    'CHANNEL_UNHOLD': (data: FreeSwitchEventData) => void;
    'CHANNEL_BRIDGE': (data: FreeSwitchEventData) => void;
    'CHANNEL_UNBRIDGE': (data: FreeSwitchEventData) => void;
    'CHANNEL_PROGRESS': (data: FreeSwitchEventData) => void;
    'CHANNEL_PROGRESS_MEDIA': (data: FreeSwitchEventData) => void;
    'CHANNEL_OUTGOING': (data: FreeSwitchEventData) => void;
    'CHANNEL_PARK': (data: FreeSwitchEventData) => void;
    'CHANNEL_UNPARK': (data: FreeSwitchEventData) => void;
    'CHANNEL_APPLICATION': (data: FreeSwitchEventData) => void;
    'CHANNEL_ORIGINATE': (data: FreeSwitchEventData) => void;
    'CHANNEL_UUID': (data: FreeSwitchEventData) => void;
    'API': (data: FreeSwitchEventData) => void;
    'LOG': (data: FreeSwitchEventData) => void;
    'INBOUND_CHAN': (data: FreeSwitchEventData) => void;
    'OUTBOUND_CHAN': (data: FreeSwitchEventData) => void;
    'STARTUP': (data: FreeSwitchEventData) => void;
    'SHUTDOWN': (data: FreeSwitchEventData) => void;
    'PUBLISH': (data: FreeSwitchEventData) => void;
    'UNPUBLISH': (data: FreeSwitchEventData) => void;
    'TALK': (data: FreeSwitchEventData) => void;
    'NOTALK': (data: FreeSwitchEventData) => void;
    'SESSION_CRASH': (data: FreeSwitchEventData) => void;
    'MODULE_LOAD': (data: FreeSwitchEventData) => void;
    'MODULE_UNLOAD': (data: FreeSwitchEventData) => void;
    'DTMF': (data: FreeSwitchEventData) => void;
    'MESSAGE': (data: FreeSwitchEventData) => void;
    'PRESENCE_IN': (data: FreeSwitchEventData) => void;
    'NOTIFY_IN': (data: FreeSwitchEventData) => void;
    'PRESENCE_OUT': (data: FreeSwitchEventData) => void;
    'PRESENCE_PROBE': (data: FreeSwitchEventData) => void;
    'MESSAGE_WAITING': (data: FreeSwitchEventData) => void;
    'MESSAGE_QUERY': (data: FreeSwitchEventData) => void;
    'ROSTER': (data: FreeSwitchEventData) => void;
    'CODEC': (data: FreeSwitchEventData) => void;
    'BACKGROUND_JOB': (data: FreeSwitchEventData) => void;
    'DETECTED_SPEECH': (data: FreeSwitchEventData) => void;
    'DETECTED_TONE': (data: FreeSwitchEventData) => void;
    'PRIVATE_COMMAND': (data: FreeSwitchEventData) => void;
    'HEARTBEAT': (data: FreeSwitchEventData) => void;
    'TRAP': (data: FreeSwitchEventData) => void;
    'ADD_SCHEDULE': (data: FreeSwitchEventData) => void;
    'DEL_SCHEDULE': (data: FreeSwitchEventData) => void;
    'EXE_SCHEDULE': (data: FreeSwitchEventData) => void;
    'RE_SCHEDULE': (data: FreeSwitchEventData) => void;
    'RELOADXML': (data: FreeSwitchEventData) => void;
    'NOTIFY': (data: FreeSwitchEventData) => void;
    'PHONE_FEATURE': (data: FreeSwitchEventData) => void;
    'PHONE_FEATURE_SUBSCRIBE': (data: FreeSwitchEventData) => void;
    'SEND_MESSAGE': (data: FreeSwitchEventData) => void;
    'RECV_MESSAGE': (data: FreeSwitchEventData) => void;
    'REQUEST_PARAMS': (data: FreeSwitchEventData) => void;
    'CHANNEL_DATA': (data: FreeSwitchEventData) => void;
    'GENERAL': (data: FreeSwitchEventData) => void;
    'COMMAND': (data: FreeSwitchEventData) => void;
    'SESSION_HEARTBEAT': (data: FreeSwitchEventData) => void;
    'CLIENT_DISCONNECTED': (data: FreeSwitchEventData) => void;
    'SERVER_DISCONNECTED': (data: FreeSwitchEventData) => void;
    'SEND_INFO': (data: FreeSwitchEventData) => void;
    'RECV_INFO': (data: FreeSwitchEventData) => void;
    'RECV_RTCP_MESSAGE': (data: FreeSwitchEventData) => void;
    'SEND_RTCP_MESSAGE': (data: FreeSwitchEventData) => void;
    'CALL_SECURE': (data: FreeSwitchEventData) => void;
    'NAT': (data: FreeSwitchEventData) => void;
    'RECORD_START': (data: FreeSwitchEventData) => void;
    'RECORD_STOP': (data: FreeSwitchEventData) => void;
    'PLAYBACK_START': (data: FreeSwitchEventData) => void;
    'PLAYBACK_STOP': (data: FreeSwitchEventData) => void;
    'CALL_UPDATE': (data: FreeSwitchEventData) => void;
    'FAILURE': (data: FreeSwitchEventData) => void;
    'SOCKET_DATA': (data: FreeSwitchEventData) => void;
    'MEDIA_BUG_START': (data: FreeSwitchEventData) => void;
    'MEDIA_BUG_STOP': (data: FreeSwitchEventData) => void;
    'CONFERENCE_DATA_QUERY': (data: FreeSwitchEventData) => void;
    'CONFERENCE_DATA': (data: FreeSwitchEventData) => void;
    'CALL_SETUP_REQ': (data: FreeSwitchEventData) => void;
    'CALL_SETUP_RESULT': (data: FreeSwitchEventData) => void;
    'CALL_DETAIL': (data: FreeSwitchEventData) => void;
    'DEVICE_STATE': (data: FreeSwitchEventData) => void;
    'TEXT': (data: FreeSwitchEventData) => void;
    'SHUTDOWN_REQUESTED': (data: FreeSwitchEventData) => void;
    'ALL': (data: FreeSwitchEventData) => void;
    'freeswitch_auth_request': (data: {
        headers: StringMap;
        body: string;
    }) => void;
    'freeswitch_command_reply': (data: FreeSwitchEventData | {
        headers: StringMap;
        body: string;
    }) => void;
    'freeswitch_linger': () => void;
    'freeswitch_disconnect': () => void;
    'freeswitch_api_response': (data: {
        headers: StringMap;
        body: string;
    }) => void;
    'cleanup_disconnect': () => void;
    [k: `CHANNEL_EXECUTE_COMPLETE ${string}`]: (data: FreeSwitchEventData) => void;
    [k: `BACKGROUND_JOB ${string}`]: (data: FreeSwitchEventData) => void;
}
export declare class FreeSwitchResponse extends FreeSwitchEventEmitter<keyof FreeSwitchResponseEvents, FreeSwitchResponseEvents> {
    closed: boolean;
    private readonly __ref;
    private __uuid;
    private readonly __socket;
    private readonly logger;
    private __queue;
    private readonly __later;
    stats: {
        missing_content_type: bigint;
        missing_event_name: bigint;
        auth_request: bigint;
        command_reply: bigint;
        events: bigint;
        json_parse_errors: bigint;
        log_data: bigint;
        disconnect: bigint;
        api_responses: bigint;
        rude_rejections: bigint;
        unhandled: bigint;
    };
    constructor(socket: Socket, logger: FreeSwitchResponseLogger);
    setUUID(uuid: string): void;
    uuid(): string | undefined;
    ref(): string;
    private error;
    onceAsync<K extends keyof FreeSwitchResponseEvents>(event: K, timeout: number, comment: string): Promise<Parameters<FreeSwitchResponseEvents[K]>[0]>;
    enqueue<T>(f: () => Promise<T>): Promise<T>;
    waitAsync(event: `BACKGROUND_JOB ${string}`, timeout: number, comment: string): SendResult;
    emit_later(event: keyof FreeSwitchResponseEvents, data: FreeSwitchEventData): boolean;
    write(command: string, args: StringMap): Promise<null>;
    send(command: string, args?: StringMap, timeout?: number): SendResult;
    end(): void;
    process(headers: StringMap, body: string): void;
    /**
       * @throws {FreeSwitchError}
       */
    api(command: string, timeout?: number): Promise<{
        headers: StringMap;
        body: string;
        uuid?: string;
    }>;
    bgapi(command: string, timeout?: number): SendResult;
    event_json(...events: EventName[]): SendResult;
    nixevent(...events: EventName[]): SendResult;
    noevents(): SendResult;
    filter(header: string, value: string): SendResult;
    filter_delete(header: string, value: string): SendResult;
    sendevent(event_name: EventName, args: StringMap): SendResult;
    auth(password: string): SendResult;
    connect(): SendResult;
    linger(): SendResult;
    exit(): SendResult;
    log(level: number): SendResult;
    nolog(): SendResult;
    sendmsg_uuid(uuid: string | undefined, command: string, args: StringMap): SendResult;
    sendmsg(command: string, args: StringMap): SendResult;
    execute_uuid(uuid: string | undefined, app_name: string, app_arg: string, loops?: number, event_uuid?: string): SendResult;
    command_uuid(uuid: string | undefined, app_name: string, app_arg?: string, timeout?: number): SendResult;
    hangup_uuid(uuid: string | undefined, hangup_cause?: string): SendResult;
    unicast_uuid(uuid: string | undefined, args: {
        'local-ip': string;
        'local-port': number;
        'remote-ip': string;
        'remote-port': number;
        transport: 'tcp' | 'udp';
        flags?: 'native';
    }): SendResult;
    execute(app_name: string, app_arg: string, loops?: number, event_uuid?: string): SendResult;
    command(app_name: string, app_arg?: string, timeout?: number): SendResult;
    hangup(hangup_cause?: string): SendResult;
    unicast(args: {
        'local-ip': string;
        'local-port': number;
        'remote-ip': string;
        'remote-port': number;
        transport: 'tcp' | 'udp';
        flags?: 'native';
    }): SendResult;
    auto_cleanup(): void;
    static default_event_timeout: number;
    static default_send_timeout: number;
    static default_command_timeout: number;
}
export {};
//# sourceMappingURL=response.d.ts.map