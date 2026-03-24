import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoadingHeader(){
    return (
        <div className="p-2 px-6 h-[79px] gap-3 bg-sidebar-accent items-center flex flex-row w-full sm:rounded-t-xl">
            <Skeleton className="h-full aspect-square rounded-full bg-primary/20" />
            <Skeleton className="w-40 bg-primary/20 h-5 rounded-full"/>
        </div>
    );
}