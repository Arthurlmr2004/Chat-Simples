import { chatReducer } from "@/reducers/chatReducer";
import { Message } from "@/types/Message";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { useUser } from "./userContext";

const STORAGE_KEY = 'chatContextContent';

type ChatContext = {
    chat: Message[];
    addMessage: (user: string, text: string) => void;
    removeMessage: (id: number) => void;
    editMessage: (id: number, newText: string) => void;
    clearChat: () => void; // Adicionando a função para limpar o chat
}

export const ChatContext = createContext<ChatContext | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [chat, dispatch] = useReducer(chatReducer, JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    const user = useUser(); // Obtenha o estado do usuário

    const addMessage = (user: string, text: string) => {
        dispatch({
            type: 'add',
            payload: { user, text }
        });
    };

    const removeMessage = (id: number) => {
        dispatch({
            type: 'remove',
            payload: { id }
        });
    };

    const editMessage = (id: number, newText: string) => {
        dispatch({
            type: 'edit',
            payload: { id, newText }
        });
    };

    const clearChat = () => {
        dispatch({ type: 'clear' });
        localStorage.removeItem(STORAGE_KEY);
    };

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chat));
    }, [chat]);

    return (
        <ChatContext.Provider value={{ chat, addMessage, removeMessage, editMessage, clearChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);
