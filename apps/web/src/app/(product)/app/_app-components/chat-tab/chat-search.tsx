import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { ChatSearchContext } from "../../contexts";

export function ChatSearch(){

    const inputRef = useRef<HTMLInputElement | null>(null)
    const {searchValue,setSearchValue} = useContext(ChatSearchContext)!

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.blur()
        },0)
    },[])

    return (
        <div className="flex items-center">
            <Search className="absolute left-[7%]" strokeWidth="1.25" />
            <Input
                className="pl-[14%] font-medium ring-0 ring-offset-0 rounded-3xl"
                type="text"
                placeholder="Search chats"
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    );
}