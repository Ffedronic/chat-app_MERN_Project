import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Banner/>
      <Routes>
        <Route index element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
