import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';

const Dashboard = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [name, setName] = useState('');

  const token = localStorage.getItem('token');

  const fetchLists = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodoLists(res.data);
    } catch (err) {
      console.error('Error fetching lists:', err);
    }
  };

  const createList = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/todos',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName('');
      fetchLists();
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="container">
      <h2>My To-Do Lists</h2>
      <input
        type="text"
        placeholder="New list name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createList}>Add List</button>

      <div style={{ marginTop: '1rem' }}>
        {todoLists.map((list) => (
          <TodoList key={list._id} list={list} fetchLists={fetchLists} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;