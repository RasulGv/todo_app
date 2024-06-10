import React, { useState } from 'react';
import styles from '../../src/components/Todolist.module.css'; 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addTodo = () => {
    if (inputValue.trim() !== '' &&!editingId) {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
    else if (editingId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId? {...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null); 
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const toggleEdit = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;
    setEditingId(id);
    setInputValue(todo.text); 
  };

  return (
    <div className={styles.todoList}>
      <h2>Todo_app</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit" className={styles.button}>Add</button>
      </form>
      <ul>
      {todos.map(todo => (
          <li key={todo.id} className={styles.todoItem}>
            {editingId === todo.id? (
              <input
                className={styles.input}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
            ) : (
              todo.text
            )}
            <button onClick={() => toggleEdit(todo.id)} className={styles.editButton}><FaEdit /></button>
            <button onClick={() => removeTodo(todo.id)} className={styles.deleteButton}><MdDelete /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;