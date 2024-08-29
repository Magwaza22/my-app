import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);
  

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index: number) => {
    setEditingTaskIndex(index);
    setNewTask(tasks[index]);
  };

  const saveEdit = () => {
    const updatedTasks = tasks.map((task, i) => 
      i === editingTaskIndex ? newTask : task
    );
    setTasks(updatedTasks);
    setNewTask('');
    setEditingTaskIndex(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
      />
      <button onClick={editingTaskIndex !== null ? saveEdit : addTask} style={{ padding: '10px', marginTop: '10px', width: '100%' }}>
        {editingTaskIndex !== null ? 'Save Edit' : 'Add Task'}
      </button>
      <ul style={{ padding: '0', marginTop: '20px', listStyleType: 'none' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span>{task}</span>
            <div>
              <button onClick={() => startEditing(index)} style={{ marginRight: '10px' }}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
