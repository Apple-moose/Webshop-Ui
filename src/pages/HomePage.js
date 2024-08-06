import React, { useState, useEffect } from "react";
import ProductBlock from "../components/ProductBlock";
import Categories from "../components/Categories";
import { Container, Row, Col } from "react-bootstrap";
import "../style/global.scss";

export default function HomePage() {
  const [selectSorting, setSelectSorting] = useState("names");

  useEffect(() => {
    !localStorage.sorting
      ? setSelectSorting("names")
      : setSelectSorting(localStorage.sorting);
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
          {Categories.map((c) => (
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
      <Container>
        <Row>
          <ProductBlock sort={selectSorting} />
        </Row>
      </Container>
    </>
  );
}
