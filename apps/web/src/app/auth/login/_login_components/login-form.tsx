import { cn } from "@/lib/utils";
import {
    Field,
    FieldGroup,
} from "@/components/ui/field";
import LoginButton from "./login-button";
import { GoogleIcon } from "./SVGs";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        Login to your account
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Login with Google or Github
                    </p>
                </div>
                <Field>
                    <LoginButton provider="Google" icon={<GoogleIcon />} />
                </Field>
            </FieldGroup>
        </form>
    );
}
