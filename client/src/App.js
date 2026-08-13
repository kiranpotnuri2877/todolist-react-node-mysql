import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// Dynamic API Base URL with Fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://54.234.20.53:5000';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleCharactersError = (value) => {
    if (value.length < 3 || value.length > 50) {
      alert('Todo must have at least 3 characters and less than 50 characters.');
      throw new Error('Invalid character length');
    }
  };

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      setTodoList(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err.message);
    }
  };

  const addTodo = async () => {
    handleCharactersError(todo);

    try {
      await axios.post(`${API_BASE_URL}/create`, {
        todo,
      });
      getAllTodos();
    } catch (err) {
      console.error('Error adding todo:', err.message);
    }
  };

  const updateTodo = async (id) => {
    handleCharactersError(newTodo);

    try {
      await axios.put(`${API_BASE_URL}/update/${id}`, {
        id,
        todo: newTodo,
      });
      getAllTodos();
    } catch (err) {
      console.error('Error updating todo:', err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodoList(todoList.filter((val) => val.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();
    setTodo('');
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className='App'>
      <Layout>
        <TodoForm handleSubmit={handleSubmit} setTodo={setTodo} todo={todo} />
        <TodoList
          todoList={todoList}
          setNewTodo={setNewTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </Layout>
    </div>
  );
}

export default App;
