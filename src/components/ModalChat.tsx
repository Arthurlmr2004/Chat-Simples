import React from 'react';

type ModalProps = {
    msg: string;
    onDelete: () => void;
    onCancel: () => void;
};

export function ModalChat({ msg, onDelete, onCancel }: ModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-gray-800 w-96 p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirmação de Exclusão</h2>
                <p>Você deseja excluir a mensagem: "{msg}"?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md">Cancelar</button>
                    <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Excluir</button>
                </div>
            </div>
        </div>
    );
}
