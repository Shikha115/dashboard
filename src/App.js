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
import Lead from "./screens/Lead";
import MutualFund from "./screens/mutual_fund/MutualFund";
import AddMutualFund from "./screens/mutual_fund/AddMutualFund";
import Demat from "./screens/demat/Demat";
import AddDemat from "./screens/demat/AddDemat";
import FixedDeposit from "./screens/fixed_dep[osit/FixedDeposit";
import AddFixedDeposit from "./screens/fixed_dep[osit/AddFixedDeposit";

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
          <Route path="/offer/credit-card" element={<ManageCredit />} />
          <Route path="/offer/credit-card/add" element={<AddCredit />} />
          <Route path="/offer/saving" element={<ManageSaving />} />
          <Route path="/offer/saving/add" element={<AddSaving />} />
          <Route path="/offer/loan" element={<ManageLoan />} />
          <Route path="/offer/loan/add" element={<AddLoan />} />
          <Route path="/lead" element={<Lead />} />
          <Route path="/offer/mutual-fund" element={<MutualFund />} />
          <Route path="/offer/mutual-fund/add" element={<AddMutualFund />} />
          <Route path="/offer/demat" element={<Demat />} />
          <Route path="/offer/demat/add" element={<AddDemat />} />
          <Route path="/offer/fixed-deposit" element={<FixedDeposit />} />
          <Route
            path="/offer/fixed-deposit/add"
            element={<AddFixedDeposit />}
          />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
