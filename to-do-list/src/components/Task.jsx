import React, { memo } from 'react';

const Task = ({
  task,
  isEditing,
  updatedTaskTitle,
  setUpdatedTaskTitle,
  onToggleCompletion,
  onRemove,
  onStartEditing,
  onCancelEditing,
  onUpdate,
}) => {
  return (
    <div className="task">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTaskTitle}
            onChange={(e) => setUpdatedTaskTitle(e.target.value)}
          />
          <button onClick={onUpdate}>Save</button>
          <button onClick={onCancelEditing}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggleCompletion}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button className="edit-button" onClick={onStartEditing}>Edit</button>
          <button onClick={onRemove}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
