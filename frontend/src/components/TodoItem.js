import axios from 'axios';

const TodoItem = ({ item, listId, fetchLists }) => {
  const toggleComplete = async () => {
    await axios.put(`http://localhost:5000/api/todos/${listId}/items/${item._id}`, {
      text: item.text,
      completed: !item.completed
    }, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    fetchLists();
  };

  const deleteItem = async () => {
    await axios.delete(`http://localhost:5000/api/todos/${listId}/items/${item._id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    fetchLists();
  };

  return (
    <div style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
      <span>{item.text}</span>
      <button onClick={toggleComplete}>✔</button>
      <button onClick={deleteItem}>🗑</button>
    </div>
  );
};

export default TodoItem;