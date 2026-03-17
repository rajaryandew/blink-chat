import { toast } from "sonner";
import { socket } from "../socket";

export function registerAuthEvents() {
    socket.on("unauthorized", () => {
        toast.error("oops! Unexpected error, try logging in again!");
    });
}
