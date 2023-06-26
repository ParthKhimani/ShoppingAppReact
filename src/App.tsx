import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
