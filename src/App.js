import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Authentication/Login";
// import "./assets/css/app-rtl.min.css";
// import "./assets/css/app-rtl.css";
// import "./assets/css/app.min.css";
import "./assets/css/app.css";
import Home from "./screens/Home";
import ProtectedRoute from "./components/protectedRoute";
import Register from "./screens/Authentication/Register";
import ForgotPassword from "./screens/Authentication/ForgotPassword";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <section className="wrapper">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute Component={Home} header={false} />}
            exact
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
