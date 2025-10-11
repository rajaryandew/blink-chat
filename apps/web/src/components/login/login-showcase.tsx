import Image from "next/image";

export default function LoginShowcase(){
    return (
        <div className="flex-none lg:flex-3 bg-muted relative hidden lg:block">
            <Image
                src="/placeholder.svg"
                alt="Image"
                width="100"
                height="100"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
    );
}