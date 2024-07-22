import { useUser } from "@/context/userContext";
import { NameInput } from "./NameInput";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { useEffect, useState } from "react";

const STORAGE_KEY_USER = 'userContextContent';
const STORAGE_KEY_CHAT = 'chatContextContent';

export function Chat() {
    const userCtx = useUser();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        if (!userCtx) return;
        if (!userCtx.user) {
            setIsLoggedOut(true);
        } else {
            setIsLoggedOut(false);
        }
    }, [userCtx]);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY_CHAT);
            localStorage.removeItem(STORAGE_KEY_USER);
        }
        userCtx?.setUser('');
    };

    if (!userCtx || isLoggedOut) return <NameInput />

    return (
        <>
            <div className="border border-white/30 rounded-md">
                <div className="h-96 p-3 overflow-y-scroll">
                    <ChatMessages />
                </div>
                <div className="border-t border-t-white/30 p-3">
                    <ChatInput name={'bot'} />
                </div>
                <div className="border-t border-t-white/30 p-3">
                    <ChatInput name={userCtx.user} />
                </div>
            </div>
            <div className="flex items-center justify-center mt-4">
                <button className="w-2/5 bg-white text-black rounded-md" onClick={handleLogout}>Sair</button>
            </div>
        </>
    );
}
