import { Skeleton } from "@/components/ui/skeleton";


export function ChatItemLoading(){
    return (
        <div className="h-18 flex items-center gap-2">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex gap-1 flex-col justify-center flex-1">
                <div className="flex flex-col flex-1 gap-2">
                <Skeleton className="w-14 h-2"/>
                <Skeleton className="h-2.5 w-1/2"/>
                </div>
            </div>
        </div>
    );
}