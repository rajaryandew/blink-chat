import * as z from "zod";

export const profileSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    username: z
        .string()
        .trim()
        .min(1, { error: "Username is required!!" })
        .regex(/^\S+$/, { message: "Username cannot contain whitespace" }),
    displayName: z
        .string()
        .trim()
        .max(50, "Display name is too long")
        .transform((v) => (v === "" ? null : v))
        .nullish(),
    profilePic: z.url().nullish(),
});
export type Profile = z.infer<typeof profileSchema>;

export const createProfileSchema = profileSchema.pick({
    username: true,
    displayName: true,
});
export type CreateProfileInput = z.infer<typeof createProfileSchema>;
