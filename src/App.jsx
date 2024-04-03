import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load todos from local storage when component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="container mx-auto max-w-md bg-purple-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">Todo List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new todo"
            className="flex-grow px-4 py-2 border border-purple-300 rounded-l focus:outline-none focus:border-purple-500"
          />
          <button onClick={addTodo} className="px-4 py-2 bg-purple-500 text-white rounded-r hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center px-4 py-2 rounded ${todo.completed ? 'bg-green-100' : 'bg-yellow-100'} hover:bg-gray-200`}
              onClick={() => toggleTodo(index)}
            >
              <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>{todo.text}</span>
              <span className="cursor-pointer text-red-500" onClick={(e) => { e.stopPropagation(); toggleTodo(index); }}>
                {todo.completed ? '✓' : '❌'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;