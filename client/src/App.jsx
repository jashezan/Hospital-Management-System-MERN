import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import routes from "./data/route";

function App() {
  const location = useLocation();
  return (
    <div>
      <Navbar />
      <main
        className={location.pathname === "/" ? "" : "container py-5 my-5"}
        style={{ minHeight: "100vh" }}
      >
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.component />}
              />
            );
          })}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
