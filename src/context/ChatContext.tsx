import { chatReducer } from "@/reducers/chatReducer";
import { Message } from "@/types/Message";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = 'chatContextContent';

type ChatContext = {
    chat: Message[];
    addMessage: (user: string, text: string) => void;
    removeMessage: (id: number) => void;
    editMessage: (id: number, newText: string) => void;
    clearChat: () => void; 
}

export const ChatContext = createContext<ChatContext | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [chat, dispatch] = useReducer(chatReducer, []);

    useEffect(() => {
        // Carregar mensagens do localStorage
        if (typeof window !== 'undefined') {
            const storedChat = localStorage.getItem(STORAGE_KEY);
            if (storedChat) {
                dispatch({ type: 'initialize', payload: JSON.parse(storedChat) });
            }
        }
    }, []);

    useEffect(() => {
        // Salvar as mensagens no localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(chat));
        }
    }, [chat]);

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
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return (
        <ChatContext.Provider value={{ chat, addMessage, removeMessage, editMessage, clearChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);
