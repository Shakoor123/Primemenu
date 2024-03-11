import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Urlmapper from "./components/urlmapper/Urlmapper.jsx";
import NotFound from "./components/notFound/NotFound.jsx";
import { Gems } from "./components/gems/gems.jsx";

const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/host/3f9bd1a2-33f7-4421-824e-9aaad9a8196d"
              element={<Gems />}
            />
            <Route path="/m/:mappercode" element={<Urlmapper />} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="App-non-mobile">
        <span className="h-title">Available on mobile only</span>
      </div>
    </>
  );
};

export default App;
