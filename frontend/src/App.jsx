import { Route, Routes, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAtom } from "./atoms/isUserAtom";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";
import Pay from "./Routes/pay";
import Transfer from "./Routes/Transfer";
import Settings from "./Routes/Settings";
import Logout from "./Routes/Logout";
import Layout from "./components/Layout";

function App() {
  const isUser = useRecoilValue(isUserAtom);
 
  return (
    <div className="flex bg-offblck">

      {isUser && <Layout />}
      <Routes>
        <Route
          path="/"
          element={!isUser ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!isUser ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signin"
          element={!isUser ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={!isUser ? <Navigate to="/" /> : <Dashboard />}
        />
        <Route
          path="/pay"
          element={!isUser ? <Navigate to="/" /> : <Pay/>}
        />
        <Route
          path="/settings"
          element={!isUser ? <Navigate to="/" /> : <Settings />}
        />
        <Route
          path="/logout"
          element={!isUser ? <Navigate to="/" /> : <Logout />}
        />
        <Route
          path="/pay/transfer"
          element={!isUser ? <Navigate to="/" /> : <Transfer />}
        />
      </Routes>
    </div>
  );
}

export default App;
