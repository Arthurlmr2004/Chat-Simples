import { useUser } from "@/context/userContext";
import { KeyboardEvent, useState } from "react";

export function NameInput() {
    const userCtx = useUser();
    const [nameInput, setNameInput] = useState('');
    const [error, setError] = useState('');

    function handleKeyUpAction(event: KeyboardEvent<HTMLInputElement>) {
        if (event.code.toLowerCase() === 'enter') {
            if (nameInput.trim() === '') {
                setError('O Nome não pode ser vazio.');
                setTimeout(() => setError(''), 2000);
            } else if (nameInput.trim() === 'bot') {
                setError('O Nome não pode ser "bot".');
                setTimeout(() => setError(''), 2000);
            } else {
                userCtx?.setUser(nameInput.trim());
                setError('');
            }
        }
    }

    const placeholderText = error ? error : 'Digite seu nome';

    const inputClassName = error ? 'border-red-700 text-red bg-white/10' : 'border-white/30 bg-white/10';

    return (
        <div className="mt-14">
            <p className="text-xl mb-4">Qual seu nome?</p>
            <div className="flex gap-3 items-center text-lg">
                <input
                    type="text"
                    className={`flex-1 border rounded-md px-4 py-3 outline-none ${inputClassName}`}
                    placeholder={placeholderText}
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    onKeyUp={handleKeyUpAction}
                    disabled={!!error} 
                />
            </div>
        </div>
    );
}
