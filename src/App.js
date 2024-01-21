import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Authentication/Login";
import './assets/css/app.min.css';
import './assets/css/app.css';
import Home from "./screens/Home";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Home} header={false} />} exact />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
