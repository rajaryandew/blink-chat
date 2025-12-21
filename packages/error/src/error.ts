import { DatabaseErrorCode } from "./error.types";

export class AppError extends Error {
    meta?: Record<string, unknown>;
    cause?: unknown; // error object

    constructor(
        message: string,
        meta?: Record<string, unknown>,
        cause?: Error
    ) {
        super(message);
        this.meta = meta;
        this.cause = cause;
    }
}

export class DatabaseError extends Error {
    code: DatabaseErrorCode;
    cause?: unknown; // error object
    meta?: Record<string, unknown>;

    constructor(
        code: DatabaseErrorCode,
        cause?: unknown,
        meta?: Record<string, unknown>
    ) {
        super(code);
        this.code = code;
        this.cause = cause;
        this.meta = meta;
    }
}