"use server";
import { CreateProfileInput, createProfileSchema } from "@repo/schema/profile";
import { auth } from "../auth/auth";
import { headers } from "next/headers";
import { createProfile } from "@repo/database/profile";

import { AppError, DatabaseError } from "@repo/error";
import { CreateProfileResponse } from "../types/profile-actions.types";
import { DatabaseErrorCode } from "@repo/error/types";

export async function createProfileAction(
    data: CreateProfileInput
): Promise<CreateProfileResponse> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const result = createProfileSchema.safeParse(data);

    if (!session) {
        return { ok: false, error: new AppError("SESSION_INVALID") };
    }
    if (!result.success) {
        return {
            ok: false,
            error: new AppError("VALIDATION_FAILED", {
                meta: result,
            }),
        };
    }

    try {
        await createProfile(result.data, session.session.userId);
    } catch (e) {
        const error = e as DatabaseError;
        switch (error.code) {
            case DatabaseErrorCode.UNIQUE_CONSTRAINT:
                return {
                    ok: false,
                    error: new AppError("USERNAME_TAKEN", {
                        meta: error.meta,
                        cause: error,
                    }),
                };
            case DatabaseErrorCode.CONSTRAINT_VIOLATION:
                return {
                    ok: false,
                    error: new AppError("MISSING_FIELDS", {
                        meta: error.meta,
                        cause: error,
                    }),
                };
            case DatabaseErrorCode.FOREIGN_KEY_VIOLATION:
                return {
                    ok: false,
                    error: new AppError("USER_NOT_AVAILABLE", { cause: error }),
                };
            case DatabaseErrorCode.DB_CONNECTION_ERROR:
                return {
                    ok: false,
                    error: new AppError("CONNECTION_FAILED", {
                        cause: error,
                    }),
                };
            default:
                return {
                    ok: false,
                    error: new AppError("UNKNOWN_ERROR", { cause: error }),
                };
        }
    }
    return { ok: true };
}