"use server"
import {getUserAvatarRecord} from "@repo/database/user"

export async function getUserAvatar(userId?:string){

    if(!userId) return undefined

    try {
        const avatar = await getUserAvatarRecord(userId)
        return avatar
    } catch (error) {
        return undefined
    }
}