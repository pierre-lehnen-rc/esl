"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/esl.ts
var esl_exports = {};
__export(esl_exports, {
  FreeSwitchClient: () => FreeSwitchClient,
  FreeSwitchError: () => FreeSwitchError,
  FreeSwitchEventEmitter: () => FreeSwitchEventEmitter,
  FreeSwitchMissingContentTypeError: () => FreeSwitchMissingContentTypeError,
  FreeSwitchMissingEventNameError: () => FreeSwitchMissingEventNameError,
  FreeSwitchResponse: () => FreeSwitchResponse,
  FreeSwitchServer: () => FreeSwitchServer,
  FreeSwitchTimeout: () => FreeSwitchTimeout,
  FreeSwitchUnhandledContentTypeError: () => FreeSwitchUnhandledContentTypeError,
  once: () => once
});
module.exports = __toCommonJS(esl_exports);

// src/client.ts
var import_node_net = require("net");

// src/event-emitter.ts
var FreeSwitchEventEmitter = class {
  __on;
  __once;
  constructor() {
    this.__on = {};
    this.__once = {};
  }
  emit(event, ...args) {
    const __on = this.__on[event];
    const __once = this.__once[event];
    delete this.__once[event];
    const count = ((__on == null ? void 0 : __on.size) ?? 0) + ((__once == null ? void 0 : __once.size) ?? 0);
    __on == null ? void 0 : __on.forEach((h) => {
      h(...args);
    });
    __once == null ? void 0 : __once.forEach((h) => {
      h(...args);
    });
    return count > 0;
  }
  on(event, handler) {
    var _a;
    if (this.__on[event] == null) {
      this.__on[event] = /* @__PURE__ */ new Set();
    }
    (_a = this.__on[event]) == null ? void 0 : _a.add(handler);
    return this;
  }
  once(event, handler) {
    var _a;
    if (this.__once[event] == null) {
      this.__once[event] = /* @__PURE__ */ new Set();
    }
    (_a = this.__once[event]) == null ? void 0 : _a.add(handler);
    return this;
  }
  async __onceAsync(event) {
    const resolver = (resolve) => (...args) => {
      resolve(args);
    };
    return await new Promise((resolve) => this.once(event, resolver(resolve)));
  }
  removeListener(event, handler) {
    var _a, _b;
    (_a = this.__on[event]) == null ? void 0 : _a.delete(handler);
    (_b = this.__once[event]) == null ? void 0 : _b.delete(handler);
  }
  removeAllListeners() {
    this.__on = {};
    this.__once = {};
  }
};
var once = async (emitter, event) => await emitter.__onceAsync(event);

// node_modules/ulidx/dist/node/index.js
var import_node_crypto = __toESM(require("crypto"), 1);

// node_modules/layerr/dist/error.js
function assertError(err) {
  if (!isError(err)) {
    throw new Error("Parameter was not an error");
  }
}
function isError(err) {
  return objectToString(err) === "[object Error]" || err instanceof Error;
}
function objectToString(obj) {
  return Object.prototype.toString.call(obj);
}

// node_modules/layerr/dist/tools.js
function parseArguments(args) {
  let options, shortMessage = "";
  if (args.length === 0) {
    options = {};
  } else if (isError(args[0])) {
    options = {
      cause: args[0]
    };
    shortMessage = args.slice(1).join(" ") || "";
  } else if (args[0] && typeof args[0] === "object") {
    options = Object.assign({}, args[0]);
    shortMessage = args.slice(1).join(" ") || "";
  } else if (typeof args[0] === "string") {
    options = {};
    shortMessage = shortMessage = args.join(" ") || "";
  } else {
    throw new Error("Invalid arguments passed to Layerr");
  }
  return {
    options,
    shortMessage
  };
}

// node_modules/layerr/dist/layerr.js
var Layerr = class _Layerr extends Error {
  constructor(errorOptionsOrMessage, messageText) {
    const args = [...arguments];
    const { options, shortMessage } = parseArguments(args);
    let message = shortMessage;
    if (options.cause) {
      message = `${message}: ${options.cause.message}`;
    }
    super(message);
    this.message = message;
    if (options.name && typeof options.name === "string") {
      this.name = options.name;
    } else {
      this.name = "Layerr";
    }
    if (options.cause) {
      Object.defineProperty(this, "_cause", { value: options.cause });
    }
    Object.defineProperty(this, "_info", { value: {} });
    if (options.info && typeof options.info === "object") {
      Object.assign(this._info, options.info);
    }
    if (Error.captureStackTrace) {
      const ctor = options.constructorOpt || this.constructor;
      Error.captureStackTrace(this, ctor);
    }
  }
  static cause(err) {
    assertError(err);
    if (!err._cause)
      return null;
    return isError(err._cause) ? err._cause : null;
  }
  static fullStack(err) {
    assertError(err);
    const cause = _Layerr.cause(err);
    if (cause) {
      return `${err.stack}
caused by: ${_Layerr.fullStack(cause)}`;
    }
    return err.stack;
  }
  static info(err) {
    assertError(err);
    const output = {};
    const cause = _Layerr.cause(err);
    if (cause) {
      Object.assign(output, _Layerr.info(cause));
    }
    if (err._info) {
      Object.assign(output, err._info);
    }
    return output;
  }
  cause() {
    return _Layerr.cause(this);
  }
  toString() {
    let output = this.name || this.constructor.name || this.constructor.prototype.name;
    if (this.message) {
      output = `${output}: ${this.message}`;
    }
    return output;
  }
};

// node_modules/ulidx/dist/node/index.js
var ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var ENCODING_LEN = 32;
var TIME_MAX = 281474976710655;
var TIME_LEN = 10;
var RANDOM_LEN = 16;
var ERROR_INFO = Object.freeze({
  source: "ulid"
});
function detectPRNG(root) {
  var _a;
  const rootLookup = root || detectRoot();
  const globalCrypto = rootLookup && (rootLookup.crypto || rootLookup.msCrypto) || (typeof import_node_crypto.default !== "undefined" ? import_node_crypto.default : null);
  if (typeof (globalCrypto == null ? void 0 : globalCrypto.getRandomValues) === "function") {
    return () => {
      const buffer = new Uint8Array(1);
      globalCrypto.getRandomValues(buffer);
      return buffer[0] / 255;
    };
  } else if (typeof (globalCrypto == null ? void 0 : globalCrypto.randomBytes) === "function") {
    return () => globalCrypto.randomBytes(1).readUInt8() / 255;
  } else if ((_a = import_node_crypto.default) == null ? void 0 : _a.randomBytes) {
    return () => import_node_crypto.default.randomBytes(1).readUInt8() / 255;
  }
  throw new Layerr({
    info: {
      code: "PRNG_DETECT",
      ...ERROR_INFO
    }
  }, "Failed to find a reliable PRNG");
}
function detectRoot() {
  if (inWebWorker())
    return self;
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  return null;
}
function encodeRandom(len, prng) {
  let str = "";
  for (; len > 0; len--) {
    str = randomChar(prng) + str;
  }
  return str;
}
function encodeTime(now, len) {
  if (isNaN(now)) {
    throw new Layerr({
      info: {
        code: "ENC_TIME_NAN",
        ...ERROR_INFO
      }
    }, `Time must be a number: ${now}`);
  } else if (now > TIME_MAX) {
    throw new Layerr({
      info: {
        code: "ENC_TIME_SIZE_EXCEED",
        ...ERROR_INFO
      }
    }, `Cannot encode a time larger than ${TIME_MAX}: ${now}`);
  } else if (now < 0) {
    throw new Layerr({
      info: {
        code: "ENC_TIME_NEG",
        ...ERROR_INFO
      }
    }, `Time must be positive: ${now}`);
  } else if (Number.isInteger(now) === false) {
    throw new Layerr({
      info: {
        code: "ENC_TIME_TYPE",
        ...ERROR_INFO
      }
    }, `Time must be an integer: ${now}`);
  }
  let mod, str = "";
  for (let currentLen = len; currentLen > 0; currentLen--) {
    mod = now % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    now = (now - mod) / ENCODING_LEN;
  }
  return str;
}
function inWebWorker() {
  return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
}
function randomChar(prng) {
  let rand = Math.floor(prng() * ENCODING_LEN);
  if (rand === ENCODING_LEN) {
    rand = ENCODING_LEN - 1;
  }
  return ENCODING.charAt(rand);
}
function ulid(seedTime, prng) {
  const currentPRNG = prng || detectPRNG();
  const seed = isNaN(seedTime) ? Date.now() : seedTime;
  return encodeTime(seed, TIME_LEN) + encodeRandom(RANDOM_LEN, currentPRNG);
}

// src/parser.ts
var import_node_querystring = require("querystring");
var FreeSwitchParserError = class extends Error {
  error;
  buffer;
  constructor(error, buffer) {
    super(JSON.stringify({ error, buffer }));
    this.error = error;
    this.buffer = buffer;
  }
};
var FreeSwitchParser = (socket, process) => {
  let body_length = 0;
  let buffer = Buffer.alloc(0);
  let buffer_length = 0;
  let headers = {};
  socket.on("data", (data) => {
    if (body_length > 0) {
      capture_body(data);
    } else {
      capture_headers(data);
    }
  });
  socket.once("end", () => {
    if (buffer_length > 0) {
      socket.emit("warning", new FreeSwitchParserError("Buffer is not empty at end of stream", buffer));
    }
  });
  const capture_body = (data) => {
    buffer_length += data.length;
    buffer = Buffer.concat([buffer, data], buffer_length);
    if (buffer_length < body_length) {
      return;
    }
    const body = buffer.toString("utf8", 0, body_length);
    buffer = buffer.slice(body_length);
    buffer_length -= body_length;
    body_length = 0;
    process(headers, body);
    headers = {};
    capture_headers(Buffer.alloc(0));
  };
  const capture_headers = (data) => {
    buffer_length += data.length;
    buffer = Buffer.concat([buffer, data], buffer_length);
    const header_end = buffer.indexOf("\n\n");
    if (header_end < 0) {
      return;
    }
    const header_text = buffer.toString("utf8", 0, header_end);
    buffer = buffer.slice(header_end + 2);
    buffer_length -= header_end + 2;
    headers = parse_header_text(header_text);
    const contentLength = headers["Content-Length"];
    if ((contentLength == null ? void 0 : contentLength.match(/^\d+$/)) != null) {
      body_length = parseInt(contentLength, 10);
      capture_body(Buffer.alloc(0));
    } else {
      process(headers, "");
      headers = {};
      capture_headers(Buffer.alloc(0));
    }
  };
};
var parse_header_text = function(header_text) {
  const header_lines = header_text.split("\n");
  const headers = {};
  for (let i = 0, len = header_lines.length; i < len; i++) {
    const line = header_lines[i];
    const [name, value] = line.split(/: /, 2);
    headers[name] = value;
  }
  const reply_text = headers["Reply-Text"];
  if (reply_text != null && (reply_text[0] ?? "") === "%") {
    for (const name in headers) {
      headers[name] = (0, import_node_querystring.unescape)(headers[name] ?? "");
    }
  }
  return headers;
};

// src/response.ts
var async_log = function(msg, ref, af, logger) {
  return async function() {
    return await af().catch(function(error) {
      logger.error(`FreeSwitchResponse::async_log: ${msg}`, { error, ref });
      throw error;
    });
  };
};
var FreeSwitchError = class extends Error {
  res;
  args;
  constructor(res, args) {
    super();
    this.res = res;
    this.args = args;
  }
  toString() {
    return `FreeSwitchError: ${JSON.stringify(this.args)}`;
  }
};
var FreeSwitchUnhandledContentTypeError = class extends Error {
  content_type;
  constructor(content_type) {
    super();
    this.content_type = content_type;
  }
  toString() {
    return `FreeSwitchUnhandledContentTypeError: ${this.content_type}`;
  }
};
var FreeSwitchMissingContentTypeError = class extends Error {
  headers;
  body;
  constructor(headers, body) {
    super();
    this.headers = headers;
    this.body = body;
  }
  toString() {
    return `FreeSwitchMissingContentTypeError: ${JSON.stringify({ headers: this.headers, body: this.body })}`;
  }
};
var FreeSwitchMissingEventNameError = class extends Error {
  headers;
  body;
  constructor(headers, body) {
    super();
    this.headers = headers;
    this.body = body;
  }
  toString() {
    return `FreeSwitchMissingEventNameError: ${JSON.stringify({ headers: this.headers, body: this.body })}`;
  }
};
var FreeSwitchTimeout = class extends Error {
  timeout;
  text;
  constructor(timeout, text) {
    super();
    this.timeout = timeout;
    this.text = text;
  }
  toString() {
    return `FreeSwitchTimeout: Timeout after ${this.timeout}ms waiting for ${this.text}`;
  }
};
var EventNames = /* @__PURE__ */ new Set([
  "CUSTOM",
  "CLONE",
  "CHANNEL_CREATE",
  "CHANNEL_DESTROY",
  "CHANNEL_STATE",
  "CHANNEL_CALLSTATE",
  "CHANNEL_ANSWER",
  "CHANNEL_HANGUP",
  "CHANNEL_HANGUP_COMPLETE",
  "CHANNEL_EXECUTE",
  "CHANNEL_EXECUTE_COMPLETE",
  "CHANNEL_HOLD",
  "CHANNEL_UNHOLD",
  "CHANNEL_BRIDGE",
  "CHANNEL_UNBRIDGE",
  "CHANNEL_PROGRESS",
  "CHANNEL_PROGRESS_MEDIA",
  "CHANNEL_OUTGOING",
  "CHANNEL_PARK",
  "CHANNEL_UNPARK",
  "CHANNEL_APPLICATION",
  "CHANNEL_ORIGINATE",
  "CHANNEL_UUID",
  "API",
  "LOG",
  "INBOUND_CHAN",
  "OUTBOUND_CHAN",
  "STARTUP",
  "SHUTDOWN",
  "PUBLISH",
  "UNPUBLISH",
  "TALK",
  "NOTALK",
  "SESSION_CRASH",
  "MODULE_LOAD",
  "MODULE_UNLOAD",
  "DTMF",
  "MESSAGE",
  "PRESENCE_IN",
  "NOTIFY_IN",
  "PRESENCE_OUT",
  "PRESENCE_PROBE",
  "MESSAGE_WAITING",
  "MESSAGE_QUERY",
  "ROSTER",
  "CODEC",
  "BACKGROUND_JOB",
  "DETECTED_SPEECH",
  "DETECTED_TONE",
  "PRIVATE_COMMAND",
  "HEARTBEAT",
  "TRAP",
  "ADD_SCHEDULE",
  "DEL_SCHEDULE",
  "EXE_SCHEDULE",
  "RE_SCHEDULE",
  "RELOADXML",
  "NOTIFY",
  "PHONE_FEATURE",
  "PHONE_FEATURE_SUBSCRIBE",
  "SEND_MESSAGE",
  "RECV_MESSAGE",
  "REQUEST_PARAMS",
  "CHANNEL_DATA",
  "GENERAL",
  "COMMAND",
  "SESSION_HEARTBEAT",
  "CLIENT_DISCONNECTED",
  "SERVER_DISCONNECTED",
  "SEND_INFO",
  "RECV_INFO",
  "RECV_RTCP_MESSAGE",
  "SEND_RTCP_MESSAGE",
  "CALL_SECURE",
  "NAT",
  "RECORD_START",
  "RECORD_STOP",
  "PLAYBACK_START",
  "PLAYBACK_STOP",
  "CALL_UPDATE",
  "FAILURE",
  "SOCKET_DATA",
  "MEDIA_BUG_START",
  "MEDIA_BUG_STOP",
  "CONFERENCE_DATA_QUERY",
  "CONFERENCE_DATA",
  "CALL_SETUP_REQ",
  "CALL_SETUP_RESULT",
  "CALL_DETAIL",
  "DEVICE_STATE",
  "TEXT",
  "SHUTDOWN_REQUESTED",
  "ALL"
]);
var isEventName = (v) => EventNames.has(v);
var FreeSwitchResponse = class _FreeSwitchResponse extends FreeSwitchEventEmitter {
  closed = true;
  __ref = ulid();
  __uuid = void 0;
  __socket;
  logger;
  __queue;
  __later;
  // The module provides statistics in the `stats` object if it is initialized. You may use it  to collect your own call-related statistics.
  stats = {
    missing_content_type: 0n,
    missing_event_name: 0n,
    auth_request: 0n,
    command_reply: 0n,
    events: 0n,
    json_parse_errors: 0n,
    log_data: 0n,
    disconnect: 0n,
    api_responses: 0n,
    rude_rejections: 0n,
    unhandled: 0n
  };
  // The `FreeSwitchResponse` is bound to a single socket (dual-stream). For outbound (server) mode this would represent a single socket call from FreeSwitch.
  constructor(socket, logger) {
    super();
    socket.setKeepAlive(true);
    socket.setNoDelay(true);
    this.__socket = socket;
    this.logger = logger;
    this.on("CHANNEL_EXECUTE_COMPLETE", (res) => {
      const event_uuid = res.body["Application-UUID"];
      this.logger.debug("FreeSwitchResponse: CHANNEL_EXECUTE_COMPLETE", {
        event_uuid,
        ref: this.__ref
      });
      this.emit(`CHANNEL_EXECUTE_COMPLETE ${event_uuid}`, res);
    });
    this.on("BACKGROUND_JOB", (res) => {
      const job_uuid = res.body["Job-UUID"];
      this.logger.debug("FreeSwitchResponse: BACKGROUND_JOB", {
        job_uuid,
        ref: this.__ref
      });
      this.emit_later(`BACKGROUND_JOB ${job_uuid}`, res);
    });
    FreeSwitchParser(this.__socket, (headers, body) => {
      this.process(headers, body);
    });
    this.__queue = Promise.resolve(true);
    this.__later = /* @__PURE__ */ new Map();
    this.closed = false;
    const socket_once_close = () => {
      this.logger.debug("FreeSwitchResponse: Socket closed", {
        ref: this.__ref
      });
      this.emit("socket.close");
    };
    this.__socket.once("close", socket_once_close);
    const socket_on_error = (err) => {
      this.logger.debug("FreeSwitchResponse: Socket Error", {
        ref: this.__ref,
        error: err
      });
      this.emit("socket.error", err);
    };
    this.__socket.on("error", socket_on_error);
    const once_socket_star = (reason) => {
      this.logger.debug("FreeSwitchResponse: Terminate", {
        ref: this.__ref,
        reason
      });
      if (!this.closed) {
        this.closed = true;
        this.__socket.end();
      }
      this.removeAllListeners();
      this.__queue = Promise.resolve(true);
      this.__later.clear();
    };
    this.once("socket.error", once_socket_star);
    this.once("socket.close", once_socket_star);
    this.once("socket.write", once_socket_star);
    this.once("socket.end", once_socket_star);
  }
  setUUID(uuid) {
    this.__uuid = uuid;
  }
  uuid() {
    return this.__uuid;
  }
  ref() {
    return this.__ref;
  }
  async error(res, data) {
    this.logger.error("FreeSwitchResponse: error: new FreeSwitchError", {
      ref: this.__ref,
      res,
      data
    });
    return await Promise.reject(new FreeSwitchError(res, data));
  }
  // onceAsync
  async onceAsync(event, timeout, comment) {
    this.logger.debug("FreeSwitchResponse: onceAsync: awaiting", {
      event,
      comment,
      ref: this.__ref,
      timeout
    });
    const onceAsyncHandler = (resolve, reject) => {
      const on_event = (value) => {
        this.logger.debug("FreeSwitchResponse: onceAsync: on_event", {
          event,
          comment,
          ref: this.__ref
        });
        cleanup();
        resolve(value);
      };
      const on_error = (error) => {
        this.logger.error("FreeSwitchResponse: onceAsync: on_error", {
          event,
          comment,
          ref: this.__ref,
          error
        });
        cleanup();
        reject(error);
      };
      const on_close = () => {
        this.logger.error("FreeSwitchResponse: onceAsync: on_close", {
          event,
          comment,
          ref: this.__ref
        });
        cleanup();
        reject(new Error(`Socket closed (${this.__ref}) while waiting for ${event} in ${comment}`));
      };
      const on_end = () => {
        this.logger.error("FreeSwitchResponse: onceAsync: on_end", {
          event,
          comment,
          ref: this.__ref
        });
        cleanup();
        reject(new Error(`end() called (${this.__ref}) while waiting for ${event} in ${comment}`));
      };
      const on_timeout = () => {
        this.logger.error("FreeSwitchResponse: onceAsync: on_timeout", {
          event,
          comment,
          ref: this.__ref,
          timeout
        });
        cleanup();
        reject(new FreeSwitchTimeout(timeout, `(${this.__ref}) event ${event} in ${comment}`));
      };
      let timer;
      const cleanup = () => {
        this.removeListener(event, on_event);
        this.removeListener("socket.error", on_error);
        this.removeListener("socket.close", on_close);
        this.removeListener("socket.write", on_error);
        this.removeListener("socket.end", on_end);
        clearTimeout(timer);
      };
      function isChannelExecuteComplete(t) {
        const s = "CHANNEL_EXECUTE_COMPLETE ";
        return t.substring(0, s.length) === s;
      }
      function isBackgroundJob(t) {
        const s = "BACKGROUND_JOB ";
        return t.substring(0, s.length) === s;
      }
      if (event === "freeswitch_auth_request") {
        this.once(event, on_event);
      } else if (event === "freeswitch_api_response") {
        this.once(event, on_event);
      } else if (event === "freeswitch_command_reply") {
        this.once(event, on_event);
      } else if (isChannelExecuteComplete(event)) {
        this.once(event, on_event);
      } else if (isBackgroundJob(event)) {
        this.once(event, on_event);
      } else {
        this.once(event, on_event);
      }
      this.once("socket.error", on_error);
      this.once("socket.close", on_close);
      this.once("socket.write", on_error);
      this.once("socket.end", on_end);
      if (timeout != null) {
        timer = setTimeout(on_timeout, timeout);
      }
    };
    return await new Promise(onceAsyncHandler);
  }
  // Queueing
  // ========
  // Enqueue a function that returns a Promise.
  // The function is only called when all previously enqueued functions-that-return-Promises are completed and their respective Promises fulfilled or rejected.
  async enqueue(f) {
    if (this.closed) {
      return await this.error(void 0, {
        when: "enqueue on closed socket"
      });
    }
    const q = this.__queue;
    const next = async function() {
      await q;
      return await f();
    }();
    this.__queue = next.then(() => true, () => true);
    return await next;
  }
  // Sync/Async event
  // ================
  // waitAsync
  // ---------
  // In some cases the event might have been emitted before we are ready to receive it.
  // In that case we store the data in `@__later` so that we can emit the event when the recipient is ready.
  async waitAsync(event, timeout, comment) {
    const v = this.__later.get(event);
    if (!this.closed && v != null) {
      this.__later.delete(event);
      return v;
    } else {
      return await this.onceAsync(event, timeout, `waitAsync ${comment}`);
    }
  }
  // emit_later
  // ----------
  // This is used for events that might trigger before we set the `once` receiver.
  emit_later(event, data) {
    const handled = this.emit(event, data);
    if (!this.closed && !handled) {
      this.__later.set(event, data);
    }
    return handled;
  }
  // Low-level sending
  // =================
  // These methods are normally not used directly.
  // write
  // -----
  // Send a single command to FreeSwitch; `args` is a hash of headers sent with the command.
  async write(command, args) {
    if (this.closed) {
      return await this.error(void 0, {
        when: "write on closed socket",
        command,
        args
      });
    }
    const writeHandler = (resolve, reject) => {
      try {
        this.logger.debug("FreeSwitchResponse: write", {
          ref: this.__ref,
          command,
          args
        });
        let text = `${command}
`;
        if (args != null) {
          for (const key in args) {
            const value = args[key];
            if (value != null) {
              text += `${key}: ${value}
`;
            }
          }
        }
        text += "\n";
        this.logger.debug("FreeSwitchResponse: write", {
          ref: this.__ref,
          text
        });
        const flushed = this.__socket.write(text, "utf8");
        if (!flushed) {
          this.logger.debug("FreeSwitchResponse: write did not flush", {
            ref: this.__ref,
            command,
            args
          });
        }
        resolve(null);
      } catch (error) {
        this.logger.error("FreeSwitchResponse: write error", {
          ref: this.__ref,
          command,
          args,
          error
        });
        if (error instanceof Error) {
          this.emit("socket.write", error);
        } else {
          this.emit("socket.write", new Error(`${error}`));
        }
        reject(error);
      }
    };
    return await new Promise(writeHandler);
  }
  // send
  // ----
  // A generic way of sending commands to FreeSwitch, wrapping `write` into a Promise that waits for FreeSwitch's notification that the command completed.
  async send(command, args = {}, timeout = _FreeSwitchResponse.default_send_timeout) {
    if (this.closed) {
      return await this.error(void 0, {
        when: "send on closed socket",
        command,
        args
      });
    }
    const msg = `send ${command} ${JSON.stringify(args)}`;
    const sendHandler = async () => {
      const p = this.onceAsync("freeswitch_command_reply", timeout, msg);
      const q = this.write(command, args);
      const [res] = await Promise.all([p, q]);
      const { headers, body } = res;
      this.logger.debug("FreeSwitchResponse: send: received reply", {
        ref: this.__ref,
        command,
        args,
        headers,
        body
      });
      const reply = headers["Reply-Text"];
      if (reply == null) {
        this.logger.debug("FreeSwitchResponse: send: no reply", {
          ref: this.__ref,
          command,
          args
        });
        return await this.error(res, {
          when: "no reply to command",
          command,
          args
        });
      }
      if (reply.match(/^-/) != null) {
        this.logger.debug("FreeSwitchResponse: send: failed", {
          ref: this.__ref,
          reply,
          command,
          args
        });
        return await this.error(res, {
          when: "command reply",
          reply,
          command,
          args
        });
      }
      this.logger.debug("FreeSwitchResponse: send: success", {
        ref: this.__ref,
        command,
        args
      });
      if (typeof body === "string") {
        return { headers: res.headers, body: { text: body } };
      } else {
        return { headers, body };
      }
    };
    return await this.enqueue(async_log(msg, this.ref(), sendHandler, this.logger));
  }
  // end
  // ---
  // Closes the socket.
  end() {
    this.logger.debug("FreeSwitchResponse: end", {
      ref: this.__ref
    });
    this.emit("socket.end", new Error("Socket close requested by application"));
  }
  // Process data from the parser
  // ============================
  // Rewrite headers as needed to work around some weirdnesses in the protocol; and assign unified event IDs to the Event Socket's Content-Types.
  process(headers, body) {
    this.logger.debug("FreeSwitchResponse::process", {
      ref: this.__ref,
      headers,
      body
    });
    const content_type = headers["Content-Type"];
    if (content_type == null) {
      this.stats.missing_content_type++;
      this.logger.error("FreeSwitchResponse::process: missing-content-type", {
        ref: this.__ref,
        headers,
        body
      });
      this.emit("error.missing-content-type", new FreeSwitchMissingContentTypeError(headers, body));
      return;
    }
    const msg = { headers, body };
    switch (content_type) {
      case "auth/request": {
        this.stats.auth_request++;
        this.emit("freeswitch_auth_request", msg);
        break;
      }
      case "command/reply": {
        this.stats.command_reply++;
        if (headers["Event-Name"] === "CHANNEL_DATA") {
          if (headers != null && "Content-Type" in headers && "Reply-Text" in headers && "Socket-Mode" in headers && "Control" in headers) {
            const {
              ["Content-Type"]: contentType,
              ["Reply-Text"]: replyText,
              ["Socket-Mode"]: socketMode,
              ["Control"]: control,
              ...bodyValuesWithout
            } = headers;
            headers = {
              "Content-Type": contentType,
              "Reply-Text": replyText,
              "Socket-Mode": socketMode,
              Control: control
            };
            const msg2 = { headers, body: bodyValuesWithout };
            this.emit("freeswitch_command_reply", msg2);
            return;
          }
        }
        this.emit("freeswitch_command_reply", msg);
        return;
      }
      case "text/event-json": {
        this.stats.events++;
        let body_values;
        try {
          body = body.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
          body_values = JSON.parse(body);
        } catch (exception) {
          this.logger.error("FreeSwitchResponse: Invalid JSON", {
            ref: this.__ref,
            body
          });
          this.stats.json_parse_errors++;
          if (exception instanceof Error) {
            this.emit("error.invalid-json", exception);
          } else {
            this.emit("error.invalid-json", new Error(`${exception}`));
          }
          return;
        }
        const new_event = body_values != null ? body_values["Event-Name"] : void 0;
        if (new_event != null && isEventName(new_event)) {
          const msg2 = { headers, body: body_values };
          this.emit(new_event, msg2);
        } else {
          this.logger.error("FreeSwitchResponse: Missing or unknown event name", {
            ref: this.__ref,
            body
          });
          this.stats.missing_event_name++;
          this.emit("error.missing-event-name", new FreeSwitchMissingEventNameError(headers, body));
        }
        return;
      }
      case "text/event-plain": {
        this.stats.events++;
        const body_values = parse_header_text(body);
        const new_event = body_values != null ? body_values["Event-Name"] : void 0;
        if (new_event != null && isEventName(new_event)) {
          const msg2 = { headers, body: body_values };
          this.emit(new_event, msg2);
        } else {
          this.logger.error("FreeSwitchResponse: Missing or unknown event name", {
            ref: this.__ref,
            body
          });
          this.stats.missing_event_name++;
          this.emit("error.missing-event-name", new FreeSwitchMissingEventNameError(headers, body));
        }
        return;
      }
      case "log/data": {
        this.stats.log_data++;
        this.emit("freeswitch_log_data", msg);
        return;
      }
      case "text/disconnect-notice": {
        this.stats.disconnect++;
        this.emit("freeswitch_disconnect_notice", msg);
        return;
      }
      case "api/response": {
        this.stats.api_responses++;
        this.emit("freeswitch_api_response", msg);
        return;
      }
      case "text/rude-rejection": {
        this.stats.rude_rejections++;
        this.emit("freeswitch_rude_rejection", msg);
        return;
      }
      default: {
        this.logger.error("FreeSwitchResponse: Unhandled Content-Type", {
          ref: this.__ref,
          content_type
        });
        this.stats.unhandled++;
        this.emit("error.unhandled-content-type", new FreeSwitchUnhandledContentTypeError(content_type));
      }
    }
  }
  // Channel-level commands
  // ======================
  // api
  // ---
  // Send an API command, see [Mod commands](http://wiki.freeswitch.org/wiki/Mod_commands) for a list.
  // Returns a Promise that is fulfilled as soon as FreeSwitch sends a reply. Requests are queued and each request is matched with the first-coming response, since there is no way to match between requests and responses.
  // Use `bgapi` if you need to make sure responses are correct, since it provides the proper semantices.
  /**
     * @throws {FreeSwitchError}
     */
  async api(command, timeout = _FreeSwitchResponse.default_event_timeout) {
    this.logger.debug("FreeSwitchResponse: api", {
      ref: this.__ref,
      command
    });
    if (this.closed) {
      return await this.error(void 0, {
        when: "api on closed socket",
        command
      });
    }
    const msg = `api ${command}`;
    const apiHandler = async () => {
      const p = this.onceAsync("freeswitch_api_response", timeout, msg);
      const q = this.write(msg, {});
      const [res] = await Promise.all([p, q]);
      this.logger.debug("FreeSwitchResponse: api: response", {
        ref: this.__ref,
        command
      });
      const reply = res == null ? void 0 : res.body;
      if (reply == null) {
        this.logger.debug("FreeSwitchResponse: api: no reply", {
          ref: this.__ref,
          command
        });
        return await this.error(res, {
          when: "no reply to api",
          command
        });
      }
      if (reply.match(/^-/) != null) {
        this.logger.debug("FreeSwitchResponse: api response failed", {
          ref: this.__ref,
          reply,
          command
        });
        return await this.error(res, {
          when: "api response",
          reply,
          command
        });
      }
      return { headers: res.headers, body: res.body, uuid: (reply.match(/^\+OK (\S+)/) ?? [])[1] };
    };
    return await this.enqueue(async_log(msg, this.ref(), apiHandler, this.logger));
  }
  // bgapi
  // -----
  // Send an API command in the background. Wraps it inside a Promise.
  async bgapi(command, timeout = _FreeSwitchResponse.default_command_timeout) {
    this.logger.debug("FreeSwitchResponse: bgapi", {
      ref: this.__ref,
      command,
      timeout
    });
    if (this.closed) {
      return await this.error(void 0, {
        when: "bgapi on closed socket",
        command
      });
    }
    const res = await this.send(`bgapi ${command}`);
    const error = async () => {
      return await this.error(res, {
        when: "bgapi did not provide a Job-UUID",
        command
      });
    };
    if (res == null) {
      return await error();
    }
    const reply = res.headers["Reply-Text"];
    let r = ((reply == null ? void 0 : reply.match(/\+OK Job-UUID: (.+)$/)) ?? [])[1];
    if (r == null && "Job-UUID" in res.headers && res.headers["Job-UUID"] != null) {
      r = res.headers["Job-UUID"];
    }
    if (r == null) {
      return await error();
    }
    this.logger.debug("FreeSwitchResponse: bgapi retrieve", {
      ref: this.__ref,
      reply_match: r
    });
    return await this.waitAsync(`BACKGROUND_JOB ${r}`, timeout, `bgapi ${command}`);
  }
  // Event reception and filtering
  // =============================
  // event_json
  // ----------
  // Request that the server send us events in JSON format.
  // For example: `res.event_json 'HEARTBEAT'`
  async event_json(...events) {
    return await this.send(`event json ${events.join(" ")}`);
  }
  // nixevents
  // ---------
  // Remove the given event types from the events ACL.
  async nixevent(...events) {
    return await this.send(`nixevent ${events.join(" ")}`);
  }
  // noevents
  // --------
  // Remove all events types.
  async noevents() {
    return await this.send("noevents");
  }
  // filter
  // ------
  // Generic event filtering
  async filter(header, value) {
    return await this.send(`filter ${header} ${value}`);
  }
  // filter_delete
  // -------------
  // Remove a filter.
  async filter_delete(header, value) {
    if (value != null) {
      return await this.send(`filter delete ${header} ${value}`);
    } else {
      return await this.send(`filter delete ${header}`);
    }
  }
  // sendevent
  // ---------
  // Send an event into the FreeSwitch event queue.
  async sendevent(event_name, args) {
    return await this.send(`sendevent ${event_name}`, args);
  }
  // Connection handling
  // ===================
  // auth
  // ----
  // Authenticate with FreeSwitch.
  // This normally not needed since in outbound (server) mode authentication is not required, and for inbound (client) mode the module authenticates automatically when requested.
  async auth(password) {
    return await this.send(`auth ${password}`);
  }
  // connect
  // -------
  // Used in server mode to start the conversation with FreeSwitch.
  // Normally not needed, triggered automatically by the module.
  async connect() {
    return await this.send("connect");
  }
  // linger
  // ------
  // Used in server mode, requests FreeSwitch to not close the socket as soon as the call is over, allowing us to do some post-processing on the call (mainly, receiving call termination events).
  // By default, `esl` with call `exit()` for you after 4 seconds. You need to capture the `cleanup_linger` event if you want to handle things differently.
  async linger() {
    return await this.send("linger", {});
  }
  // exit
  // ----
  // Send the `exit` command to the FreeSwitch socket.
  // FreeSwitch will respond with "+OK bye" followed by a `disconnect-notice` message, which gets translated into a `freeswitch_disconnect_notice` event internally, which in turn gets translated into either `freeswitch_disconnect` or `freeswitch_linger` depending on whether `linger` was called on the socket.
  // You normally do not need to call `@exit` directly. If you do, make sure you do handle any rejection.
  async exit() {
    return await this.send("exit");
  }
  // Event logging
  // =============
  // log
  // ---
  // Enable logging on the socket, optionally setting the log level.
  async log(level) {
    if (level != null) {
      return await this.send(`log ${level}`);
    } else {
      return await this.send("log");
    }
  }
  // nolog
  // -----
  // Disable logging on the socket.
  async nolog() {
    return await this.send("nolog");
  }
  // Message sending
  // ===============
  // sendmsg_uuid
  // ------------
  // Send a command to a given UUID.
  async sendmsg_uuid(uuid, command, args) {
    const options = args ?? {};
    options["call-command"] = command;
    let execute_text = "sendmsg";
    if (uuid != null) {
      execute_text = `sendmsg ${uuid}`;
    } else if (this.__uuid != null) {
      execute_text = `sendmsg ${this.__uuid}`;
    }
    const res = await this.send(execute_text, options);
    this.logger.debug("FreeSwitchResponse: sendmsg_uuid", {
      ref: this.__ref,
      uuid,
      command,
      args,
      res
    });
    return res;
  }
  // sendmsg
  // -------
  // Send Message, assuming server/outbound ESL mode (in which case the UUID is not required).
  async sendmsg(command, args) {
    return await this.sendmsg_uuid(void 0, command, args);
  }
  // Client-mode ("inbound") commands
  // =================================
  // The target UUID must be specified.
  // execute_uuid
  // ------------
  // Execute an application for the given UUID (in client mode).
  async execute_uuid(uuid, app_name, app_arg, loops, event_uuid) {
    const options = {
      "execute-app-name": app_name,
      "execute-app-arg": app_arg
    };
    if (loops != null) {
      options.loops = loops.toString(10);
    }
    if (event_uuid != null) {
      options["Event-UUID"] = event_uuid;
    }
    const res = await this.sendmsg_uuid(uuid, "execute", options);
    this.logger.debug("FreeSwitchResponse: execute_uuid", {
      ref: this.__ref,
      uuid,
      app_name,
      app_arg,
      loops,
      event_uuid,
      res
    });
    return res;
  }
  // TODO: Support the alternate format (with no `execute-app-arg` header but instead a `text/plain` body containing the argument).
  // command_uuid
  // ------------
  // Execute an application synchronously. Return a Promise.
  async command_uuid(uuid, app_name, app_arg, timeout = _FreeSwitchResponse.default_command_timeout) {
    if (app_arg == null) {
      app_arg = "";
    }
    const event_uuid = ulid();
    const event = `CHANNEL_EXECUTE_COMPLETE ${event_uuid}`;
    const p = this.onceAsync(event, timeout, `uuid ${uuid} ${app_name} ${app_arg}`);
    const q = this.execute_uuid(uuid, app_name, app_arg, void 0, event_uuid);
    const [res] = await Promise.all([p, q]);
    this.logger.debug("FreeSwitchResponse: command_uuid", {
      ref: this.__ref,
      uuid,
      app_name,
      app_arg,
      timeout,
      event_uuid,
      res
    });
    return res;
  }
  // hangup_uuid
  // -----------
  // Hangup the call referenced by the given UUID with an optional (FreeSwitch) cause code.
  async hangup_uuid(uuid, hangup_cause) {
    if (hangup_cause == null) {
      hangup_cause = "NORMAL_UNSPECIFIED";
    }
    const options = {
      "hangup-cause": hangup_cause
    };
    return await this.sendmsg_uuid(uuid, "hangup", options);
  }
  // unicast_uuid
  // ------------
  // Forwards the media to and from a given socket.
  // Arguments:
  // - `local-ip`
  // - `local-port`
  // - `remote-ip`
  // - `remote-port`
  // - `transport` (`tcp` or `udp`)
  // - `flags: "native"` (optional: do not transcode to/from L16 audio)
  async unicast_uuid(uuid, args) {
    const options = {
      ...args,
      "local-port": args["local-port"].toString(10),
      "remote-port": args["remote-port"].toString(10)
    };
    return await this.sendmsg_uuid(uuid, "unicast", options);
  }
  // nomedia_uuid
  // ------------
  // Not implemented yet (TODO).
  // Server-mode commands
  // ====================
  // In server (outbound) mode, the target UUID is always our (own) call UUID, so it does not need to be specified.
  // execute
  // -------
  // Execute an application for the current UUID (in server/outbound mode)
  async execute(app_name, app_arg, loops, event_uuid) {
    return await this.execute_uuid(void 0, app_name, app_arg, loops, event_uuid);
  }
  // command
  // -------
  async command(app_name, app_arg, timeout = _FreeSwitchResponse.default_command_timeout) {
    return await this.command_uuid(void 0, app_name, app_arg, timeout);
  }
  // hangup
  // ------
  async hangup(hangup_cause) {
    return await this.hangup_uuid(void 0, hangup_cause);
  }
  // unicast
  // -------
  async unicast(args) {
    return await this.unicast_uuid(void 0, args);
  }
  // TODO: `nomedia`
  // TODO: `getvar`
  // TODO: `divert_events` (?)
  // TODO: `resume` (?)
  // Cleanup at end of call
  // ======================
  // auto_cleanup
  // ------------
  // Clean-up at the end of the connection.
  // Automatically called by the client and server.
  auto_cleanup() {
    this.once("freeswitch_disconnect_notice", (res) => {
      this.logger.debug("FreeSwitchResponse: auto_cleanup: Received ESL disconnection notice", {
        ref: this.__ref,
        res
      });
      switch (res.headers["Content-Disposition"]) {
        case "linger":
          this.logger.debug("FreeSwitchResponse: Sending freeswitch_linger", {
            ref: this.__ref
          });
          this.emit("freeswitch_linger");
          break;
        case "disconnect":
          this.logger.debug("FreeSwitchResponse: Sending freeswitch_disconnect", {
            ref: this.__ref
          });
          this.emit("freeswitch_disconnect");
          break;
        default:
          this.logger.debug("FreeSwitchResponse: Sending freeswitch_disconnect", {
            ref: this.__ref
          });
          this.emit("freeswitch_disconnect");
      }
    });
    const linger_delay = 4e3;
    const once_freeswitch_linger = () => {
      this.logger.debug("FreeSwitchResponse: auto_cleanup/linger", {
        ref: this.__ref
      });
      if (this.emit("cleanup_linger")) {
        this.logger.debug("FreeSwitchResponse: auto_cleanup/linger: cleanup_linger processed, make sure you call exit()", {
          ref: this.__ref
        });
      } else {
        this.logger.debug(`FreeSwitchResponse: auto_cleanup/linger: exit() in ${linger_delay}ms`, {
          ref: this.__ref
        });
        setTimeout(() => {
          this.logger.debug("FreeSwitchResponse: auto_cleanup/linger: exit()", {
            ref: this.__ref
          });
          this.exit().catch(function() {
            return true;
          });
        }, linger_delay);
      }
    };
    this.once("freeswitch_linger", once_freeswitch_linger);
    const once_freeswitch_disconnect = () => {
      this.logger.debug("FreeSwitchResponse: auto_cleanup/disconnect", {
        ref: this.__ref
      });
      if (this.emit("cleanup_disconnect")) {
        this.logger.debug("FreeSwitchResponse: auto_cleanup/disconnect: cleanup_disconnect processed, make sure you call end()", {
          ref: this.__ref
        });
      } else {
        setTimeout(() => {
          this.logger.debug("FreeSwitchResponse: auto_cleanup/disconnect: end()", {
            ref: this.__ref
          });
          this.end();
        }, 100);
      }
    };
    this.once("freeswitch_disconnect", once_freeswitch_disconnect);
  }
  // Event Emitter
  // =============
  // `default_event_timeout`
  // -----------------------
  // The default timeout waiting for events.
  // Note that this value must be longer than (for exemple) a regular call's duration, if you want to be able to catch `EXECUTE_COMPLETE` on `bridge` commands.
  static default_event_timeout = 9 * 3600 * 1e3;
  // 9 hours
  // `default_send_timeout`
  // ----------------------
  // Formerly `command_timeout`, the timeout for a command sent via `send` when none is specified.
  static default_send_timeout = 10 * 1e3;
  // 10s
  // `default_command_timeout`
  // -------------------------
  // The timeout awaiting for a response to a `command` call.
  static default_command_timeout = 1 * 1e3;
  // 1s
};

// src/client.ts
var default_password = "ClueCon";
var FreeSwitchClient = class extends FreeSwitchEventEmitter {
  options;
  current_call = void 0;
  running = true;
  retry = 200;
  attempt = 0n;
  logger;
  /**
   * Create a new client that will attempt to connect to a FreeSWITCH Event Socket.
   * @param options.host default: `127.0.0.1`
   * @param options.port default: 8021
   * @param options.password default: `ClueCon`
   * @param options.logger default: `console` Object
   */
  constructor(options) {
    super();
    this.logger = (options == null ? void 0 : options.logger) ?? console;
    this.options = {
      host: "127.0.0.1",
      port: 8021,
      password: default_password,
      ...options ?? {}
    };
    this.logger.info("FreeSwitchClient: Ready to start Event Socket client, use connect() to start.");
  }
  connect() {
    var _a;
    if (!this.running) {
      this.logger.debug("FreeSwitchClient::connect: not running, aborting", { options: this.options, attempt: this.attempt });
      return;
    }
    this.attempt++;
    this.logger.debug("FreeSwitchClient::connect", { options: this.options, attempt: this.attempt, retry: this.retry });
    (_a = this.current_call) == null ? void 0 : _a.end();
    const socket = new import_node_net.Socket();
    this.current_call = new FreeSwitchResponse(socket, this.logger);
    socket.once("connect", () => {
      void (async () => {
        var _a2, _b, _c, _d;
        try {
          await ((_a2 = this.current_call) == null ? void 0 : _a2.onceAsync("freeswitch_auth_request", 2e4, "FreeSwitchClient expected authentication request"));
          await ((_b = this.current_call) == null ? void 0 : _b.auth(this.options.password));
          (_c = this.current_call) == null ? void 0 : _c.auto_cleanup();
          await ((_d = this.current_call) == null ? void 0 : _d.event_json("CHANNEL_EXECUTE_COMPLETE", "BACKGROUND_JOB"));
        } catch (error) {
          this.logger.error("FreeSwitchClient: connect error", error);
          this.emit("error", error);
        }
        if (this.running && this.current_call != null) {
          this.emit("connect", this.current_call);
        }
      })();
    });
    socket.once("error", (error) => {
      const code = "code" in error ? error.code : void 0;
      if (this.retry < 5e3) {
        if (code === "ECONNREFUSED") {
          this.retry = Math.floor(this.retry * 1200 / 1e3);
        }
      }
      this.logger.error("FreeSwitchClient::connect: client received `error` event", { attempt: this.attempt, retry: this.retry, error, code });
      if (this.running) {
        this.emit("reconnecting", this.retry);
        setTimeout(() => {
          this.connect();
        }, this.retry);
      }
    });
    socket.once("end", () => {
      this.logger.debug("FreeSwitchClient::connect: client received `end` event (remote end sent a FIN packet)", { attempt: this.attempt, retry: this.retry });
      if (this.running) {
        this.emit("reconnecting", this.retry);
        setTimeout(() => {
          this.connect();
        }, this.retry);
      }
    });
    socket.on("warning", (data) => {
      this.emit("warning", data);
    });
    try {
      this.logger.debug("FreeSwitchClient::connect: socket.connect", { options: this.options, attempt: this.attempt, retry: this.retry });
      socket.connect(this.options);
    } catch (error) {
      this.logger.error("FreeSwitchClient::connect: socket.connect error", { error });
    }
  }
  end() {
    this.logger.debug("FreeSwitchClient::end: end requested by application.", { attempt: this.attempt });
    this.emit("end");
    this.running = false;
    if (this.current_call != null) {
      this.current_call.end();
      this.current_call = void 0;
    }
  }
};

// src/server.ts
var import_node_net2 = __toESM(require("net"), 1);
var FreeSwitchServer = class extends FreeSwitchEventEmitter {
  stats = {
    error: 0n,
    drop: 0n,
    connection: 0n,
    connected: 0n,
    connection_error: 0n,
    connection_handled: 0n,
    connection_not_handled: 0n
  };
  __server;
  logger;
  /**
   * Create a new Node.js server that will accept Event Socket connections from FreeSWITCH.
   * @param options.all_events request all events from FreeSWITCH. default: true
   * @param options.my_events filter out events not related to the current session. default: true
   * @param options.logger default: `console` Object
   */
  constructor(options) {
    options ?? (options = {});
    super();
    this.logger = options.logger ?? console;
    const allEvents = options.all_events ?? true;
    const myEvents = options.my_events ?? true;
    this.__server = new import_node_net2.default.Server({
      noDelay: true,
      keepAlive: true
    });
    this.__server.on("error", (exception) => {
      this.stats.error++;
      this.logger.error("FreeSwitchServer: server error", exception);
      this.emit("error", exception);
    });
    this.__server.on("drop", (data) => {
      this.stats.drop++;
      this.logger.error("FreeSwitchServer: server drop", data);
      if (data == null) {
        this.emit("drop");
      } else {
        this.emit("drop", data);
      }
    });
    this.__server.on("connection", (socket) => {
      void (async () => {
        this.stats.connection++;
        try {
          this.logger.debug("FreeSwitchServer received connection");
          const call = new FreeSwitchResponse(socket, this.logger);
          const Unique_ID = "Unique-ID";
          const connectResponse = await call.connect();
          const data = connectResponse.body;
          const uuid = data[Unique_ID];
          this.stats.connected++;
          this.logger.debug("FreeSwitchServer received connection: connected", { uuid });
          if (uuid != null) {
            call.setUUID(uuid);
            if (myEvents) {
              await call.filter(Unique_ID, uuid);
            }
          }
          call.auto_cleanup();
          if (allEvents) {
            await call.event_json("ALL");
          } else {
            await call.event_json("CHANNEL_EXECUTE_COMPLETE", "BACKGROUND_JOB");
          }
          this.logger.debug("FreeSwitchServer received connection: sending `connection` event", { uuid });
          if (this.emit("connection", call, { ...connectResponse, data, uuid })) {
            this.stats.connection_handled++;
          } else {
            this.stats.connection_not_handled++;
          }
        } catch (error) {
          this.stats.connection_error++;
          this.logger.error("FreeSwitchServer: connection handling error", error);
          if (error instanceof Error) {
            this.emit("error", error);
          } else {
            this.emit("error", new Error(`${error}`));
          }
        }
      })();
    });
    this.__server.on("listening", () => {
      this.logger.debug("FreeSwitchServer listening", this.__server.address());
    });
    this.__server.on("close", () => {
      this.logger.debug("FreeSwitchServer closed");
    });
    this.logger.info("FreeSwitchServer: Ready to start Event Socket server, use listen() to start.");
  }
  async listen(options) {
    const p = new Promise((resolve) => this.__server.once("listening", resolve));
    this.__server.listen(options);
    await p;
  }
  async close() {
    const p = new Promise((resolve) => this.__server.once("close", resolve));
    this.__server.close();
    await p;
  }
  async getConnectionCount() {
    return await new Promise((resolve, reject) => {
      this.__server.getConnections(function(err, count) {
        if (err != null) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  }
  getMaxConnections() {
    return this.__server.maxConnections;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreeSwitchClient,
  FreeSwitchError,
  FreeSwitchEventEmitter,
  FreeSwitchMissingContentTypeError,
  FreeSwitchMissingEventNameError,
  FreeSwitchResponse,
  FreeSwitchServer,
  FreeSwitchTimeout,
  FreeSwitchUnhandledContentTypeError,
  once
});
