import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../context/AuthContext";
import axios from "../../../axios";
import Navbar from "../../../components/Navbar";

export default function TodoList() {
  const [todo, setTodo] = useState({
    title: "",
    status: "pending",
    due: "2022-04-09T00:00:00.000+05:30",
  });
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/users/${user.id}/todos`, {
        user_id: user.id,
        title: todo.title,
        status: todo.status,
        due_on: todo.due,
      });
      setTodos([...todos, data]);
      setTodo({ ...todo, title: "" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/users/${user.id}/todos`);
      console.log(data);
      setTodos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => fetchTodos(), []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/todos/${id}`);
      console.log(data);
      fetchTodos();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleComplete = async (todo) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/todos/${todo.id}`, {
        id: todo.id,
        user_id: user.id,
        title: todo.title,
        due_on: todo.due_on,
        status: "completed",
      });
      fetchTodos();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleInComplete = async (todo) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/todos/${todo.id}`, {
        id: todo.id,
        user_id: user.id,
        title: todo.title,
        due_on: todo.due_on,
        status: "pending",
      });
      fetchTodos();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-gray-700 font-bold text-2xl">Todo List</h1>
            <form className="flex mt-4" onSubmit={handleAdd}>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
                name="title"
                value={todo.title}
                onChange={handleChange}
                required
              />
              <button
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal-500"
                disabled={loading}
              >
                {loading ? "..." : "Add"}
              </button>
            </form>
          </div>
          <div>
            {!loading &&
              todos.length > 0 &&
              todos.map((todo) => (
                <div key={todo.id} className="flex mb-4 items-center">
                  <p
                    className={`w-full text-grey-darkest  ${
                      todo.status === "completed" && " line-through"
                    }`}
                  >
                    {todo.title}
                  </p>

                  {todo.status === "pending" ? (
                    <button
                      onClick={() => handleComplete(todo)}
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-300 hover:bg-green-500"
                    >
                      Done
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInComplete(todo)}
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-gray-300 hover:bg-gray-500"
                    >
                      Not Done
                    </button>
                  )}

                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-300 hover:text-white hover:bg-red-500"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
