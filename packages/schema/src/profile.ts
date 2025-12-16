import * as z from "zod";

export const profileSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    username: z.string().min(1, { error: "Username is required!!" }),
    displayName: z
        .string()
        .min(5, { error: "Display name is too short!" })
        .max(50, { error: "Display name is too long!" })
        .nullish(),
    profilePic: z.url().nullish(),
});
export type Profile = z.infer<typeof profileSchema>;

export const createProfileSchema = profileSchema.pick({
    username: true,
    displayName: true,
});
export type CreateProfileInput = z.infer<typeof createProfileSchema>;
