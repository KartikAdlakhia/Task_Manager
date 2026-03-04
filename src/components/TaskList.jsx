import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { Plus } from 'lucide-react';
import './TaskList.css';

export function TaskList({ tasks, onToggle, onDelete, onEdit, onAdd, filter, onFilterChange }) {
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="task-list-container">
            <div className="list-header">
                <div className="filter-tabs">
                    <button
                        className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => onFilterChange('all')}
                    >All Tasks</button>
                    <button
                        className={`tab-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => onFilterChange('active')}
                    >Active</button>
                    <button
                        className={`tab-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => onFilterChange('completed')}
                    >Completed</button>
                </div>
                <button className="add-task-btn" onClick={onAdd}>
                    <Plus size={18} strokeWidth={2.5} />
                    <span>New Task</span>
                </button>
            </div>

            <div className="tasks-scroll-area">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No tasks found in this view.</p>
                        {filter === 'all' && (
                            <button className="add-task-empty-btn" onClick={onAdd}>
                                Add your first task
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
