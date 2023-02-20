import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingMemory, startDeletingMemory} from './actions';

export function Memory(props) {
    const memory = props.memory;
    const dispatch = useDispatch();
    const [year] = useState(memory.year);
    const [month] = useState(memory.month);
    const [day] = useState(memory.day);
    const [message, setMessage] = useState(memory.message);

    const onEdit = () => {
        dispatch(enterEditMode(memory));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(memory));
    }

    const onSave = () => {
        dispatch(startSavingMemory({
            id: memory.id,
            year,
            month,
            day,
            message,
            start_time: memory.start_time,
            end_time: memory.end_time
            
        }));
    }

    const onDelete = () => {
        dispatch(startDeletingMemory(memory));
    }

    let edit_font_size = 1;
    let edit_border_size = 3;

    if (memory.end_time > 50) {
        edit_font_size = 1.5;
        edit_border_size = 7;
    }

    // If edit button is clicked, allow event to edited/saved/deleted
    if (memory.isEditing) {
        return (
            <div className="time-slot" style={{
                bottom: (memory.start_time - (196 - memory.end_time)) + 'px',
                height: 196 + 'px',
                zIndex: '1'
            }}>
                <div className="memory" style={{
                    boxShadow: '5px 10px 8px #888888'
                }}>
                    <div className="memory-left">
                    
                        <button id="save" onClick={onSave}>save</button>
                        <button id="cancel" onClick={onCancel}>cancel</button>
                        <button id="delete" onClick={onDelete} className='delete-button'>delete</button>
                    </div>
                    <div className="memory-right">
                        <textarea id="event-text" value={message} placeholder="Event Title" 
                        onChange={e => setMessage(e.target.value)}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            
            <div className="time-slot" style={{
                bottom: memory.start_time + 'px',
                height: memory.end_time + 'px',
            }}>
                <div className="memory" style={{
                    boxShadow: '5px 10px 8px #888888'
                }}>
                    <div className="memory-left">
                        <button id="edit" style={{
                            fontSize: edit_font_size + 'em',
                            border: edit_border_size + 'px solid rgb(118, 119, 195)',
                        }}
                        onClick={onEdit}>edit</button>
                    </div>
                    <div className="memory-right">
                        {memory.message}
                    </div>
                </div>
            </div>
        );
    }
}