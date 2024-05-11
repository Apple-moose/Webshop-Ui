import React, { useEffect } from "react";
import ProductBlock from "../components/ProductBlock";
// import { useDispatch } from "react-redux";

export default function HomePage() {


  return (
    <>
      <h1>Filters: by tags Sort: by popularity/price</h1>
      <ProductBlock />
    </>
  );
}
