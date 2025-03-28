import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
