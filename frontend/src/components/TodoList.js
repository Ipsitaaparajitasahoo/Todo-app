import { useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = ({ list, fetchLists }) => {
  const [text, setText] = useState('');

  const token = localStorage.getItem('token');

  const addItem = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/todos/${list._id}/items`,
        { text },
        {
          headers: { Authorization:`Bearer ${token}` }
        }
      );
      setText('');
      fetchLists();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteList = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/todos/${list._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchLists();
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  return (
    <div style={{
      background: '#e0e0e0',
      padding: '1rem',
      margin: '1rem 0',
      borderRadius: '6px'
    }}>
      <h3>{list.name} <button onClick={deleteList}>🗑</button></h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add item"
      />
      <button onClick={addItem}>Add</button>
      {list.items.map(item => (
        <TodoItem key={item._id} item={item} listId={list._id} fetchLists={fetchLists} />
      ))}
    </div>
  );
};

export default TodoList;