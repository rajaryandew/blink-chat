import { auth } from "@/lib/auth/auth";
import { getProfileRecord } from "@/lib/db/profile/get-profile";
import { AuthStatus } from "@/lib/types";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const session = await auth.api.getSession({
            headers: await headers()
        })
    
        if(!session){
            const authStatus = AuthStatus.notAuthenticated
            return NextResponse.json({authStatus})
        }

        const userId = session.user.id
        const profile = await getProfileRecord(userId)

        if(!profile){
            const authStatus = AuthStatus.incompleteProfile
            return NextResponse.json({authStatus})
        }
        
        const authStatus = AuthStatus.authenticated
        return NextResponse.json({authStatus})

    } catch{
        return NextResponse.json({authStatus: AuthStatus.errorFindingStatus},{
            status:500
        })
    }
}