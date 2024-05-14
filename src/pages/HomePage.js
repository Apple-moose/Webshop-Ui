import React, { useState, useEffect } from "react";
import ProductBlock from "../components/ProductBlock";

export default function HomePage() {
  const [selectSorting, setSelectSorting] = useState("Names");
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Plants" },
    { id: 4, name: "Books" },
    { id: 7, name: "Games" },
    { id: 8, name: "Sport" },
  ];

  useEffect(() => {
    setSelectSorting(localStorage.sorting);
  }, []);

  return (
    <>
      <h3>
        &nbsp;&nbsp;Sort by:{" "}
        <select
          value={selectSorting}
          onChange={(e) => {
            setSelectSorting(e.target.value);
            localStorage.setItem("sorting", e.target.value);
          }}
        >
          <option value="names">Names</option>
          <option value="price">Price</option>
          <option value="tags">Category</option>
        </select>
        &nbsp;&nbsp;&nbsp;&nbsp; Filter by Category:{" "}
        <select
          value={selectSorting}
          onChange={(e) => {
            setSelectSorting(e.target.value);
            localStorage.setItem("sorting", e.target.value);
          }}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        &nbsp;&nbsp;&nbsp;
        <button
          onClick={() => {
            setSelectSorting("names");
            localStorage.setItem("sorting", "names");
          }}
        >
          Reset Filters
        </button>
      </h3>
      <ProductBlock sort={selectSorting} />
    </>
  );
}
