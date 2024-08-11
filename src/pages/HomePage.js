import React, { useState, useEffect } from "react";
import ProductBlock from "../components/ProductBlock";
import Categories from "../components/Categories";
import { Container, Row, Col, Card, CardHeader, Form } from "react-bootstrap";
import "../style/global.scss";

export default function HomePage() {
  const [selectSorting, setSelectSorting] = useState("names");

  useEffect(() => {
    !localStorage.sorting
      ? setSelectSorting("id")
      : setSelectSorting(localStorage.sorting);
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Card className="shadow-lg border-0 bg-white rounded">
          <CardHeader className="h5">
            <Row className="justify-content-md-left">
              <Col md="4">
                <Form.Select
                  value={selectSorting}
                  onChange={(e) => {
                    setSelectSorting(e.target.value);
                    localStorage.setItem("sorting", e.target.value);
                  }}
                >
                  <option value="id">Sort Products by:</option>
                  <option value="names">Names</option>
                  <option value="price">Price</option>
                  <option value="tags">Category</option>
                </Form.Select>
              </Col>
              <Col md="4">
                <Form.Select
                  value={selectSorting}
                  onChange={(e) => {
                    setSelectSorting(e.target.value);
                    localStorage.setItem("sorting", e.target.value);
                  }}
                >
                  <option key="0" value="names">
                    All Categories
                  </option>
                  {Categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Container>
      <h1>&nbsp;</h1>
      <Container>
        <Row>
          <ProductBlock sort={selectSorting} />
        </Row>
      </Container>
    </>
  );
}
