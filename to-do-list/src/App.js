import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Tasks from './components/Tasks'; 

function App() {
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (newTask) => {
    if (newTask.trim() === '') return;
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks]; 
      updatedTasks.splice(index, 1); 
      return updatedTasks; 
    });
  };

  const updateTask = (index, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? updatedTask : task))
    );
  };

  return (
    <>
      <Form handleSubmit={handleSubmit} />
      <h1>My to-do list</h1>
      <Tasks tasks={tasks} removeTask={removeTask} updateTask={updateTask} />
    </>
  );
}

export default App;
