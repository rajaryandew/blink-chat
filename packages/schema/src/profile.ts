import * as z from "zod"

const ProfileSchema = z.object({
    id:z.uuid(),
    userId:z.string(),
    username:z.string(),
    displayName:z.string().nullable(),
    profilePic:z.url().nullable()
})
export type Profile = z.infer<typeof ProfileSchema>


const createProfileSchema = ProfileSchema.pick({
    username:true,
    displayName:true,
})
export type CreateProfileInput = z.infer<typeof createProfileSchema>