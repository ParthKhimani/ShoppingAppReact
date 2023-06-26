import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import ErrorPage from "./Components/ErrorPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/error-page" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
