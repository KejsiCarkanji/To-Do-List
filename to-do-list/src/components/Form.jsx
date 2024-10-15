import React, { useState } from 'react';

const Form = ({ handleSubmit }) => {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    handleSubmit(task); 
    setTask(''); 
  };

  return (
    <div>
      <label htmlFor="task">Add task</label>
      <input
        id="task"
        type="text"
        value={task}
        onChange={handleChange}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default Form;
