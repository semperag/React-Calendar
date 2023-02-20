import {Action} from './actions';

const initialState = {
    isWaiting: false,
    memories: [],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case Action.LoadMemories:
            return {
                ...state,
                memories: action.payload,
            }
        case Action.FinishAddingMemory:
            return {
                ...state,
                memories: [{...action.payload, isEditing: false},
                     ...state.memories],
            }
        case Action.EnterEditMode:
            return {
                ...state,
                memories: state.memories.map(memory => {
                    if (memory.id === action.payload.id) {
                        return {...memory, isEditing: true};
                    } else {
                        return memory;
                    }
                }),
            }
        case Action.LeaveEditMode:
            return {
                ...state,
                memories: state.memories.map(memory => {
                    if (memory.id === action.payload.id) {
                        return {...memory, isEditing: undefined};
                    } else {
                        return memory;
                    }
                }),
            }
        case Action.FinishSavingMemory:
            return {
                ...state,
                memories: state.memories.map(memory => {
                    if (memory.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return memory;
                    }
                }),
            }
        case Action.FinishDeletingMemory:
            return {
                ...state,
                memories: state.memories.filter(memory =>
                    memory.id !== action.payload.id),
            }
        default:
            return state;
    }
}

export default reducer;