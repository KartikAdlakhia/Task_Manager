import React from 'react';
import { Check, Trash2, Edit2, Clock } from 'lucide-react';
import './TaskItem.css';

export function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const dateStr = new Date(task.createdAt).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric'
    });

    return (
        <div className={`task-item glass-panel ${task.completed ? 'completed' : ''}`}>
            <button
                className={`checkbox-btn ${task.completed ? 'checked' : ''}`}
                onClick={() => onToggle(task.id)}
                aria-label="Toggle task completion"
            >
                {task.completed && <Check size={16} strokeWidth={3} />}
            </button>

            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && <p className="task-desc">{task.description}</p>}
                <div className="task-meta">
                    <Clock size={12} />
                    <span>{dateStr}</span>
                </div>
            </div>

            <div className="task-actions">
                <button className="action-btn edit" onClick={() => onEdit(task)} title="Edit Task">
                    <Edit2 size={16} />
                </button>
                <button className="action-btn delete" onClick={() => onDelete(task.id)} title="Delete Task">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
