import { AppError } from "@repo/error"

export type CreateProfileResponse = {
    ok:boolean,
    error?: AppError
}