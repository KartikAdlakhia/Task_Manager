import { useState, useEffect } from 'react';

const TASKS_STORAGE_KEY = 'taskflow_data';

export function useTasks() {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem(TASKS_STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load tasks from local storage', e);
        }
        // Default mock data
        return [
            { id: '1', title: 'Review implementation plan', description: 'Check the architecture document', completed: true, createdAt: Date.now() - 86400000 },
            { id: '2', title: 'Build Core Components', description: 'Implement React state and layout', completed: false, createdAt: Date.now() },
            { id: '3', title: 'Polish UI/UX', description: 'Add animations and premium aesthetic', completed: false, createdAt: Date.now() }
        ];
    });

    useEffect(() => {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = ({ title, description }) => {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            description,
            completed: false,
            createdAt: Date.now(),
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const updateTask = (id, updates) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));
    };

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };

    return { tasks, addTask, updateTask, toggleTask, deleteTask, stats };
}
