
import { useChat } from "@/context/ChatContext";
import { KeyboardEvent, useState } from "react";

type ChatInputProps = {
    name: string
}

export function ChatInput({ name }: ChatInputProps) {
    const chatCtx = useChat();
    const [textInput, setTextInput] = useState('');

    function handleKeyUpAction(event: KeyboardEvent<HTMLInputElement>) {
        if (event.code.toLowerCase() === 'enter') {
            if (textInput.trim() !== '') {
                chatCtx?.addMessage(name, textInput.trim());
                setTextInput('');
            }
        }
    }

    return (
        <>
            <input
                type="text"
                placeholder={`${name}, digite uma mensagem (e aperte enter)`}
                className="w-full bg-transparent text-white text-md outline-none"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                onKeyUp={handleKeyUpAction}
            />

        </>
    );
}