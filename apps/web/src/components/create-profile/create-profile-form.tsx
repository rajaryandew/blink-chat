"use client";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { CreateProfileInput, createProfileSchema } from "@repo/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfileAction } from "@/lib/server-actions/profile.actions";

export default function CreateProfileForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProfileInput>({
        resolver: zodResolver(createProfileSchema),
    });

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(createProfileAction)} method="post"> 
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
                    <Input {...register("displayName")}/>
                    <FieldError>{errors.displayName?.message}</FieldError>
                </Field>
                <Field>
                    <Button type="submit">Continue</Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
