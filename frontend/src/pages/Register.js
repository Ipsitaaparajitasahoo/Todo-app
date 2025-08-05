import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: '300px', margin: 'auto' }}>
  <h2>Register</h2>
  <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
  <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
  <button type="submit">Register</button>
  </form>
  );
};

export default Register;