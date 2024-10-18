  import React, { useState } from 'react';
  import Task from './Task';

  const Tasks = ({ tasks, onToggleCompletion, onRemove, onUpdate }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState('');

    const startEditing = (task) => {
      setEditingIndex(task.id);
      setUpdatedTaskTitle(task.title);
    };

    const cancelEditing = () => {
      setEditingIndex(null);
      setUpdatedTaskTitle('');
    };

    const handleUpdate = (taskId) => {
      onUpdate(taskId, updatedTaskTitle);
      setEditingIndex(null);
      setUpdatedTaskTitle('');
    };

    return (
      <div className="tasks">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            isEditing={editingIndex === task.id}
            updatedTaskTitle={updatedTaskTitle}
            setUpdatedTaskTitle={setUpdatedTaskTitle}
            onToggleCompletion={() => onToggleCompletion(task)}
            onRemove={() => onRemove(task.id)}
            onStartEditing={() => startEditing(task)}
            onCancelEditing={cancelEditing}
            onUpdate={() => handleUpdate(task.id)}
          />
        ))}
      </div>
    );
  };

  export default Tasks;
