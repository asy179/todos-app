import { useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { useTodosContext } from '../context/TodosContext';
import { useTodosStore } from '../store';

const InputTodo = () => {
  const addTodoItem = useTodosStore((state) => state.addTodoItem);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodoItem(title);
      setTitle('');
      setMessage('')
    } else {
      setMessage('Please add todo text.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Add Todo..."
          value={title}
          onChange={handleChange}
          className="input-text"
        />
        <button className="input-submit" > <FiPlusCircle style={{ fontSize: "26px" }}/></button>
      </form>
      <span className="submit-warning">{message}</span>
    </>
  );
};
export default InputTodo;
