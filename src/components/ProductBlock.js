import "../style/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  selectProductsByNames,
  selectProductsByTags,
  selectProductsByPrices,
  selectFilteredProducts,
} from "../store/products/selectors";
import { selectUser } from "../store/user/selectors";
import { productSeen } from "../store/user/slice";
import { CartEmpty, CartFull } from "./CartButtons";
import Categories from "./Categories";
import {
  Row,
  Col,
  Card,
  Badge,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import { Text } from "react-native-web";

export default function ProductBlock(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProducts);
  const productsByNames = useSelector(selectProductsByNames);
  const productsByTags = useSelector(selectProductsByTags);
  const productsByPrices = useSelector(selectProductsByPrices);
  const filteredProducts = useSelector(selectFilteredProducts(props.sort));

  const user = useSelector(selectUser);
  let sorts = props.sort;

  const sortedProductArray = (s) => {
    if (s === "id") return product;
    if (s === "names") return productsByNames;
    if (s === "tags") return productsByTags;
    if (s === "price") return productsByPrices;
    else return filteredProducts;
  };

  const findUserData = (productId) => {
    return user.find((u) => u.id === productId);
  };

  const mapUserForSeen = (proId) => {
    return user.map((u) => {
      if (u.id === proId) return !u.seen ? 0 : u.seen;
    });
  };

  return sortedProductArray(sorts).map((pro) => {
    return (
      <Col xs={4} className="mb-4">
        <Card className="h-100 w-100 shadow-lg border-0 bg-white rounded">
          <CardHeader className="h4">
            <Row className="justify-content-between">
              <Col xs={9}>{pro.name}</Col>
              <Col xs={3}>
                <Badge
                  pill
                  className="mb-0 font-weight-bold size-large text-light bg-primary"
                >
                  👁️:&nbsp; {!findUserData(pro.id) ? 0 : mapUserForSeen(pro.id)}
                </Badge>
              </Col>
            </Row>
          </CardHeader>
          <Link
            to={`./${pro.id}`}
            onClick={() => dispatch(productSeen(pro.id))}
          >
            <Card.Img
              variant="top"
              src={pro.imageUrl}
              height="400hv"
              width="100%"
              object-fit="cover"
              alt="not found!"
              key={pro.id}
            />
          </Link>
          <CardBody className="card-footer h5">
            <p>
              Category:{" "}
              {Categories.map((cat) => {
                if (cat.id === pro.categoryId) return cat.name;
              })}{" "}
            </p>
            <span className="leftright">
              <b>
                <Badge
                  pill
                  className="mb-0 font-weight-bold d-inline-flex align-items-center text-dark bg-warning"
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    €{pro.price}
                  </Text>
                </Badge>
              </b>
              {!findUserData(pro.id) ? (
                <CartEmpty key={pro.id} id={pro.id} price={pro.price} />
              ) : (
                user.map((u) => {
                  if (u.id === pro.id)
                    return u.buy > 0 ? (
                      <CartFull
                        key={u.id}
                        id={u.id}
                        buy={u.buy}
                        price={pro.price}
                      />
                    ) : (
                      <CartEmpty key={u.id} id={u.id} price={pro.price} />
                    );
                })
              )}{" "}
            </span>
          </CardBody>
        </Card>
      </Col>
    );
  });
}
