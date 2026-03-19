"use client"
import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket";
import { toast } from "sonner";

export function createChat(chatInput:CreateChatInput){
    socket.emit("chat:create",chatInput)
}

export function registerChatEvents(){
    socket.on("chat:created",(response) => {
        if(response.success === false){
            switch(response.data.message){
                case "CHAT_ALREADY_EXISTS":
                    toast.warning("Chat with this person exists!")
                    break
                case "MISSING_FIELDS":
                    toast.error("Try creating the chat once again!!")
                    break
                case "PERSON_NOT_FOUND":
                case "USERNAME_INCORRECT":
                    toast.error("oops! Looks like the username is incorrect. Please recheck it")
                    break
                case "CONNECTION_FAILED":
                    toast.error("Server failed to connect! Try again after sometime.")
                    break
                case "UNKNOWN_ERROR":
                default:
                    toast.error("oops! Something went wrong, try again after sometime")
                    break
            }
        }


    })
}