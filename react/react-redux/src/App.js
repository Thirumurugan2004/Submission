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
          {/* Landing page */}
          <Route path="/" element={<Home />} />

          {/* Login page */}
          <Route path="/login" element={<LoginForm />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 */}
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
