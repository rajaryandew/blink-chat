"use client"
import { UserCircle } from "@/components/ui/icons";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MessageTabContext } from "../../contexts";
import { useContext } from "react";

export default function ChatHeader({name}:{name:string}){
    
    const {setIsMessageTabOpen} = useContext(MessageTabContext)!

    return(
        <div className="p-2 px-6 h-[79px] gap-3 bg-sidebar-accent flex flex-row w-full sm:rounded-t-xl">
            <Link href="/app" onClick={() => setIsMessageTabOpen(true)} className="content-center sm:hidden">
                <ArrowLeft/>
            </Link>
            <UserCircle/>
            <h2 className="content-center font-semibold text-xl">{name}</h2>
        </div>
    )
}