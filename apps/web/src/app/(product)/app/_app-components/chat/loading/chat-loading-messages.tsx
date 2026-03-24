import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoadingMessages() {
    return (
        <div className="mt-3 mx-2 flex-1 flex gap-1 flex-col">
            <div className="w-full">
                <Skeleton className="w-40 h-15 rounded-xl rounded-tl-none" />
            </div>
            <div className="flex w-full justify-end">
                <Skeleton className="w-40 h-8 rounded-xl rounded-tr-none" />
            </div>
            <div className="w-full">
                <Skeleton className="w-40 h-15 rounded-xl rounded-tl-none" />
            </div>
            <div className="flex w-full justify-end">
                <Skeleton className="w-40 h-8 rounded-xl rounded-tr-none" />
            </div>
            <div className="w-full">
                <Skeleton className="w-40 h-15 rounded-xl rounded-tl-none" />
            </div>
            <div className="flex w-full justify-end">
                <Skeleton className="w-40 h-8 rounded-xl rounded-tr-none" />
            </div>
        </div>
    );
}
