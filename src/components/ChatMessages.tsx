import { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";
import { ModalChat } from "./ModalChat";
import { BotIcon, EllipsisVertical, User } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export function ChatMessages() {
    const chatCtx = useChat();
    const userCtx = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<{ id: number; text: string } | null>(null);
    const [showMenu, setShowMenu] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<{ id: number; text: string } | null>(null);
    const [newText, setNewText] = useState('');

    useEffect(() => {
        if (!userCtx?.user) {
            chatCtx?.clearChat();
        }
    }, [userCtx?.user]);

    function openModal(id: number, text: string) {
        setSelectedMessage({ id, text });
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedMessage(null);
        setIsEditing(null);
    }

    function handleDelete() {
        if (selectedMessage) {
            chatCtx?.removeMessage(selectedMessage.id);
            closeModal();
        }
    }

    function handleEdit() {
        if (isEditing) {
            chatCtx?.editMessage(isEditing.id, newText);
            setNewText('');
            setIsEditing(null);
            setShowMenu(null);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {chatCtx?.chat.map(item => (
                <div
                    key={item.id}
                    className={`border border-white/20 rounded-md p-2 text-sm flex items-center justify-between
                        ${item.user === userCtx?.user ? 'self-end bg-white/10 text-right' : 'self-start bg-white/5 text-left'}
                    `}
                >
                    <div className="flex items-center gap-2">
                        {item.user === userCtx?.user ? <User size={20} /> : <BotIcon size={20} />}
                        <div className="max-w-xs flex-1">
                            <div className="font-bold truncate" title={item.user}>
                                {item.user}
                            </div>
                            <div className="mt-1 break-words">{item.text}</div>
                        </div>
                    </div>
                    {item.user === userCtx?.user && (
                        <div className="relative">
                            <button onClick={() => setShowMenu(showMenu === item.id ? null : item.id)}>
                                <div className="ml-3">
                                    <EllipsisVertical size={20} />
                                </div>
                            </button>
                            {showMenu === item.id && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <button
                                        onClick={() => setIsEditing({ id: item.id, text: item.text })}
                                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                                    >
                                        Editar mensagem
                                    </button>
                                    <button
                                        onClick={() => openModal(item.id, item.text)}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Deletar mensagem
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
            {isModalOpen && selectedMessage && (
                <ModalChat
                    msg={selectedMessage.text}
                    onDelete={handleDelete}
                    onCancel={closeModal}
                />
            )}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-4 rounded-md shadow-lg">
                        <textarea
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={4}
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={() => setIsEditing(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
