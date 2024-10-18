import { memo, useState } from 'react';

const Form = memo(({ handleSubmit }) => {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    handleSubmit(task);
    setTask('');
  };

  return (
    <form className="task-form">
      <input
        id="task"
        type="text"
        value={task}
        onChange={handleChange}
        className="task-input"
        placeholder='Add a task'
      />
      <button type="button" onClick={addTask} className="task-button">Add</button>
    </form>
  );
});

export default Form;
