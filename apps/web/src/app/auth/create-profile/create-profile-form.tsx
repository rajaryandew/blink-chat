"use client";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CreateProfileInput, createProfileSchema } from "@repo/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCreateProfile } from "@/lib/client-handlers/profile.handlers";

export default function CreateProfileForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateProfileInput>({
        resolver: zodResolver(createProfileSchema),
    });

    return (
        <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit((data) =>
                handleCreateProfile(data, setError)
            )}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create new Profile</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter the fields below to proceed
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="username">Username*</FieldLabel>
                    <Input
                        {...register("username")}
                        placeholder="john_doe123"
                    />
                    <FieldError>{errors.username?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="displayName">Display name</FieldLabel>
                    <Input {...register("displayName")} />
                    <FieldError>{errors.displayName?.message}</FieldError>
                </Field>
                <Field>
                    <Button type="submit" disabled={isSubmitting}>
                        Continue
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
