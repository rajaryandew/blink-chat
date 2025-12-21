import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { DatabaseError } from "@repo/error";
import { DatabaseErrorCode } from "@repo/error/types";

export function mapDatabaseError(err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown Error");
    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return new DatabaseError(
                    DatabaseErrorCode.UNIQUE_CONSTRAINT,
                    error,
                    err.meta
                );
            case "P2003":
                return new DatabaseError(
                    DatabaseErrorCode.FOREIGN_KEY_VIOLATION,
                    error,
                    err.meta
                );
            case "P2011":
                return new DatabaseError(
                    DatabaseErrorCode.CONSTRAINT_VIOLATION,
                    error,
                    err.meta
                );
            case "P2001":
                return new DatabaseError(
                    DatabaseErrorCode.RECORD_NOT_FOUND,
                    error,
                    err.meta
                );
            case "P1001":
                return new DatabaseError(
                    DatabaseErrorCode.DB_CONNECTION_ERROR,
                    error,
                    err.meta
                );
        }
    }
    return new DatabaseError(DatabaseErrorCode.UNKNOWN_DB_ERROR, error);
}
