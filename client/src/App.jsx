import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Header } from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { AddEditTour } from "./pages/AddEditTour";
import { SinglePost } from "./pages/SinglePost";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  // console.log(user);
  dispatch(setUser(user));
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addPost" element={<AddEditTour />} />
          {/* <Route path="/editTour/:id" element={<AddEditTour />} /> */}
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
