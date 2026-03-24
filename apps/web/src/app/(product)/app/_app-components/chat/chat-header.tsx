"use client"
import { UserCircle } from "@/components/ui/icons";

export default function ChatHeader({name}:{name:string}){
    return(
        <div className="p-2 px-6 h-[79px] gap-3 bg-sidebar-accent flex flex-row w-full rounded-t-xl">
            <UserCircle/>
            <h2 className="content-center font-semibold text-xl">{name}</h2>
        </div>
    )
}