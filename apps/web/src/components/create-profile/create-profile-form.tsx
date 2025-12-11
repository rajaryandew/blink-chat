import { Button } from "../ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

export default function CreateProfileForm() {
    return (
        <form className="flex flex-col gap-6">
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
                        id="username"
                        type="text"
                        placeholder="john_doe123"
                        required
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="display_name">Display name</FieldLabel>
                    <Input id="display_name" type="text"/>
                </Field>
                <Field>
                    <Button type="submit">Continue</Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
