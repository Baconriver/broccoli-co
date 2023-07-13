import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex w-full h-screen flex-col ">
      <NavBar />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
