"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createProfile } from "@/lib/server_actions/profile"

export function CreateProfileForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form action={createProfile} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your Profile</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your profile
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" name="username" type="text" placeholder="john_doe" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Display Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" required />
        </Field>
        <Field>
          <Button type="submit">Create Profile</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
