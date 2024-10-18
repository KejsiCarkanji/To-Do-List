import { useState, useEffect, useMemo,useCallback } from 'react';
import './App.css';
import Form from './components/Form';
import Tasks from './components/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/todos');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = useCallback(async (newTask) => {
    if (newTask.trim() === '') return;
    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask, completed: false }),
      });
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }, []);

  const removeTask = useCallback(async (taskId) => {
    try {
      await fetch(`http://localhost:8080/todos/${taskId}`, {
        method: 'DELETE',
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  }, []);

  const updateTask = useCallback(async (taskId, newTitle) => {
    if (newTitle.trim() === '') return;
    try {
      const response = await fetch(`http://localhost:8080/todos/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, []);

  const handleCompletionToggle = useCallback(async (task) => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, []);

  const completedCount = useMemo(() => 
    tasks.filter(task => task.completed).length,
    [tasks]
  );

  const uncompletedCount = useMemo(() => 
    tasks.length - completedCount, [tasks, completedCount]);

  return (
    <div className="container">
      <h1>My to-do list</h1>
      <Form handleSubmit={handleSubmit} />
      <div className="widgets">
        <div className="widget">
          <p>Completed: {completedCount}</p>
        </div>
         <div className="widget">
            <p>Uncompleted: {uncompletedCount}</p>
         </div>
      </div>
      <Tasks
        tasks={tasks}
        onToggleCompletion={handleCompletionToggle}
        onRemove={removeTask}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default App;
