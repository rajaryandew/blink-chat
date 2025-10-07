import { cn } from "@/lib/utils"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import SignupButton from "./googleLoginButton"
import GoogleLogo from "../svgs/google"
import GithubLogo from "../svgs/github";

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
                  <SignupButton
                      logo={<GoogleLogo/>}
                      provider="google"
                      text="Google"
                  />
                  <SignupButton
                      logo={<GithubLogo/>}
                      provider="github"
                      text="Github"
                  />
              </Field>
          </FieldGroup>
      </form>
  );
}
