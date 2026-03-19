import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { DatabaseError } from "@repo/error";
import { DatabaseErrorCode } from "@repo/error/types";

export function mapDatabaseError(err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown Error");
    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                const fields = Array.isArray(err.meta?.target)
                    ? err.meta?.target
                    : [];
                return new DatabaseError(
                    DatabaseErrorCode.UNIQUE_CONSTRAINT,
                    error,
                    { fields },
                );
            case "P2003":
                return new DatabaseError(
                    DatabaseErrorCode.FOREIGN_KEY_VIOLATION,
                    error,
                    {
                        field: err.meta?.field_name,
                        table: err.meta?.table_name,
                    },
                );
            case "P2011":
                return new DatabaseError(
                    DatabaseErrorCode.CONSTRAINT_VIOLATION,
                    error,
                    {
                        constraint: err.meta?.constraint_name,
                        table: err.meta?.table,
                    },
                );
            case "P2001":
            case "P2025":
                return new DatabaseError(
                    DatabaseErrorCode.RECORD_NOT_FOUND,
                    error,
                    {
                        table: err.meta?.model,
                    },
                );
            case "P1001":
                return new DatabaseError(
                    DatabaseErrorCode.DB_CONNECTION_ERROR,
                    error,
                );
        }
    }
    return new DatabaseError(DatabaseErrorCode.UNKNOWN_DB_ERROR, error);
}
