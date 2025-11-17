import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginForm from "./components/LoginForm";
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
                Uhh-ohh 😢 No page found
              </h1>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
