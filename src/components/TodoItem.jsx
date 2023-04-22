import styles from '../styles/TodoItem.module.css';
import { useState, useRef } from 'react';
import { useTodosContext } from '../context/TodosContext';
import { useTodosStore } from '../store';
import { useAuthContext } from '../context/AuthContext';
import { FaTrash } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdRampRight } from 'react-icons/md';

const TodoItem = ({ itemProp }) => {
    const handleChange = useTodosStore((state) => state.handleChange);
    const delTodo = useTodosStore((state) => state.delTodo);
    const setUpdate = useTodosStore((state) => state.setUpdate);
    const [editing, setEditing] = useState(false);
    //const [updateInput, setUpdateInput] = useState(itemProp.title);
    const editInputRef = useRef(null);
    const completedStyle = {
      fontStyle: 'italic',
      color: '#523600',
      opacity: 0.8,
      textDecoration: 'line-through',
    };
    const { user } = useAuthContext();
    const handleEditing = () => {
      setEditing(true);
    };
    const handleUpdatedDone = (event) => {
      if (event.key === 'Enter') {
        setUpdate(editInputRef.current.value, itemProp.id);
        setEditing(false);
      }
    };
    let viewMode = {};
    let editMode = {};
    if (editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }
    return (
      <li className={styles.item}>
        <div className={styles.content} style={viewMode}>
          <label className={styles.container}>
            <input type="checkbox"
            checked={itemProp.completed}
            onChange={() => handleChange(itemProp.id)}/>
            <span className={styles.checkmark}></span>
            <span style={itemProp.completed ? completedStyle : null}>
            {itemProp.title}
          </span>
          </label>
          <div>
            {user && (<button onClick={handleEditing}> 
              <FiEdit style={{ fontSize: "18px", marginRight: "10px" }} />
            </button>)}
            <button onClick={() => delTodo(itemProp.id)}>
              <FiTrash style={{ fontSize: "18px" }} />
            </button>
          </div>
        </div>
        <input
          type="text"
          ref={editInputRef}
          defaultValue={itemProp.title}
          // value={updateInput}
          className={styles.textInput}
          style={editMode}   
          // onChange={(e) => setUpdateInput(e.target.value)}
          onKeyDown={handleUpdatedDone}
         />
      </li>
    );
  };
  export default TodoItem;
  