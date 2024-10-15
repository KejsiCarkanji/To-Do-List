import React from 'react';

const Task = ({
  task,
  index,
  isEditing,
  removeTask,
  handleEdit,
  updatedTask,
  setUpdatedTask,
  handleUpdate,
}) => {
  let originalTask = task;
  const startEditing = () => {
    setUpdatedTask(originalTask); 
    handleEdit(index); 
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <button onClick={() => handleUpdate(index)}>Save</button>
          <button 
            onClick={() => {
              setUpdatedTask(originalTask); 
              handleEdit(null); 
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{task}</p>
          <div className="edit-buttons">
            <button onClick={startEditing}>Edit</button>
            <button className="remove-button" onClick={() => removeTask(index)}>Remove</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
