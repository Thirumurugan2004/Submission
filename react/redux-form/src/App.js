import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "red" }}>Uhh-ohh 😢 No page found</h1>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
