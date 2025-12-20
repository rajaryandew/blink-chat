import { DatabaseErrorCode } from "./error.types"

export class AppError extends Error{
    code:string
    cause?:unknown

    constructor(code:string,message:string,cause:Error){
        super(message)
        this.code = code
        this.cause = cause
    }
}

export class DatabaseError extends Error{
    code:DatabaseErrorCode
    cause?: unknown

    constructor(code:DatabaseErrorCode,cause?:unknown){
        super(code)
        this.code = code
        this.cause = cause
    }
}