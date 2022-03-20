import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import SetAvatar from "./components/SetAvatar";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Banner/>
      <Routes>
        <Route index element={<Login />}/>
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
