import React from "react";
import { Route } from "react-router-dom";
import Products from "./Products";

function Routers({ productItems }) {
  return (
    <div>
      <Route path="/" exact>
        <Products productItems={productItems} />
      </Route>
    </div>
  );
}

export default Routers;
