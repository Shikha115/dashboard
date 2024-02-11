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
import ManageBank from "./screens/ManageBank";
import ManageCredit from "./screens/credit_card/ManageCredit";
import AddCredit from "./screens/credit_card/AddCredit";
import ManageSaving from "./screens/saving/ManageSaving";
import AddSaving from "./screens/saving/AddSaving";
import ManageLoan from "./screens/loan/ManageLoan";
import AddLoan from "./screens/loan/AddLoan";

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
          <Route path="/manage-bank" element={<ManageBank />} />
          <Route path="/manage-credit-card" element={<ManageCredit />} />
          <Route path="/add-credit-card" element={<AddCredit />} />
          <Route path="/manage-saving" element={<ManageSaving />} />
          <Route path="/add-saving" element={<AddSaving />} />
          <Route path="/manage-loan" element={<ManageLoan />} />
          <Route path="/add-loan" element={<AddLoan/>} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
