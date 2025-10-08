import { GalleryVerticalEnd } from "lucide-react";
import { CreateProfileForm } from "./create-profile-form";

export default function CreateProfilePanel(){
    return (
        <div className="flex-2 flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
                <a href="#" className="flex items-center gap-2 font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    BlinkChat
                </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <CreateProfileForm />
                </div>
            </div>
        </div>
    );
}