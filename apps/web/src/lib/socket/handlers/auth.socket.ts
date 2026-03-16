import { toast } from "sonner";
import { socket } from "../socket";

export function registerAuthEvents() {
    socket.on("unauthorized", () => {
        toast.error("opps! Unexpected error, try logging in again!");
    });
}
