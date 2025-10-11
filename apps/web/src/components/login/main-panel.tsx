import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./login-form";

export default function MainLoginPanel(){
    return (
        <div className="flex-1 lg:flex-2 flex flex-col gap-4 p-6 md:p-10">
            {/* icon and name */}
            <div className="flex justify-center gap-2 md:justify-start">
                <a href="#" className="flex items-center gap-2 font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    BlinkChat
                </a>
            </div>
            {/* main form */}
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}