import React, { useState } from 'react';
import Task from './Task';


const Tasks = ({ tasks, removeTask, updateTask }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [updatedTask, setUpdatedTask] = useState('');

  const handleEdit = (index) => {
    setCurrentTaskIndex(index);
    setUpdatedTask(tasks[index]);
  };

  const handleUpdate = (index) => {
    if (updatedTask.trim() === '') return;
    updateTask(index, updatedTask);
    setCurrentTaskIndex(null);
    setUpdatedTask('');
  };

  return (
    <div className='tasks'>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index}
          isEditing={currentTaskIndex === index}
          removeTask={removeTask}
          handleEdit={handleEdit}
          updatedTask={updatedTask}
          setUpdatedTask={setUpdatedTask}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default Tasks;
