import { cn } from "@/lib/utils"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import GoogleLoginButton from "./loginForm/googleLoginButton"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>
        <Field>
          <GoogleLoginButton/>
        </Field>
      </FieldGroup>
    </form>
  )
}
