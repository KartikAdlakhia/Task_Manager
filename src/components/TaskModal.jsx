import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './TaskModal.css';

export function TaskModal({ isOpen, onClose, onSave, taskToEdit = null }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (taskToEdit && isOpen) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
        } else if (isOpen) {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (taskToEdit) {
            onSave(taskToEdit.id, { title: title.trim(), description: description.trim() });
        } else {
            onSave({ title: title.trim(), description: description.trim() });
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" autoFocus onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close modal">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="task-title">Task Title</label>
                        <input
                            id="task-title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="What needs to be done?"
                            autoFocus
                            className="glass-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="task-desc">Description (Optional)</label>
                        <textarea
                            id="task-desc"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Add more details..."
                            className="glass-input"
                            rows={4}
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={!title.trim()}>
                            {taskToEdit ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
