import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Auth from "./pages/Auth";
import TodoList from "./pages/Dashboard/TodoList";
import Account from "./pages/Dashboard/Account";
import Blog from "./pages/Blog";
import SinglePost from "./pages/Blog/SinglePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Blog />} />

        <Route path="/auth" element={<Auth />} />
        <Route path="/blog/:id" element={<SinglePost />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/todos" element={<TodoList />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
