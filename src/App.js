/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./routes/home/home.component";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";

// const Shop = () => {
//   return <h1>This is a Shop component</h1>;
// };

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} /> {/*/home/shop */}
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
