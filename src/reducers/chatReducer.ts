import { Message } from "@/types/Message";

type AddAction = {
    type: 'add';
    payload: {
        user: string;
        text: string;
    }
}

type RemoveAction = {
    type: 'remove';
    payload: {
        id: number;
    }
}

type EditAction = {
    type: 'edit',
    payload: {
        id: number;
        newText: string;
    }
}

type ClearAction = {
    type: 'clear';
}

type ChatActions = AddAction | RemoveAction | EditAction | ClearAction;
export const chatReducer = (state: Message[], action: ChatActions) => {
    switch (action.type) {
        case 'add':
            return [...state, {
                id: state.length,
                user: action.payload.user,
                text: action.payload.text
            }];

        case 'remove':
            return state.filter(e => e.id !== action.payload.id);

        case 'edit':
            return state.map(event => {
                if (event.id === action.payload.id) event.text = action.payload.newText;
                return event;
            })
            
        case 'clear':
            return [];

        default:
            return state;
    }
}