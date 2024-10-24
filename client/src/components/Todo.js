import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    };

    const addTask = async () => {
        const response = await axios.post('http://localhost:5000/tasks', { title: newTask, completed: false });
        setTasks([...tasks, response.data]);
        setNewTask('');
    };

    const toggleTaskCompletion = async (id, completed) => {
        await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add new task" />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <button onClick={() => toggleTaskCompletion(task.id, task.completed)}>
                            {task.completed ? 'Unmark' : 'Mark'} as completed
                        </button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
