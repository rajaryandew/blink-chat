import Image from "next/image";

export default function CreateProfileShowcase() {
    return (
        <div className="lg:flex-3 bg-muted relative hidden lg:block">
            <Image
                height={10}
                width={10}
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
    );
}
