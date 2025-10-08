import { authClient } from "@/lib/auth/auth-client";
import CreateProfileShowcase from "@/components/create-profile/create-profile-showcase";
import CreateProfilePanel from "@/components/create-profile/create-profile-panel";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function CreateProfilePage({}) {
    const { data: session } = await authClient.getSession({
        fetchOptions:{
            headers: await headers()
        },
    });
    if (!session) {
        redirect("/");
    }

    return (
        <div className="flex flex-row min-h-svh">
            <CreateProfileShowcase />
            <CreateProfilePanel />
        </div>
    );
}
