import createProfileRecord from "../db/profile/create-profile";
import { NewProfile } from "../types";

export async function createProfile(formData: FormData){

    const profile:NewProfile = Object.fromEntries(formData) as unknown as NewProfile;

    try{
        await createProfileRecord(profile)
    }catch(err){
        throw err
    }
}