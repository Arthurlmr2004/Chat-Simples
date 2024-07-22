import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const STORAGE_KEY = 'userContextContent';

type UserContext = {
    user: string;
    setUser: (newUser: string) => void;
}

export const userContext = createContext<UserContext | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem(STORAGE_KEY);
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, user);
        }
    }, [user]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => useContext(userContext);
