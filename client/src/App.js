import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000/api/todos";

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;

    await axios.post(API, { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>MERN Todo App</h1>

      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      {todos.map((todo) => (
        <div key={todo._id}>
          <p>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;