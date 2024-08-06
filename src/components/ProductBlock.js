import "../style/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  CardHeader,
  CardBody,
} from "react-bootstrap";

export default function ProductBlock(props) {
  const dispatch = useDispatch();
  // const product = useSelector(selectProducts);
  const productsByNames = useSelector(selectProductsByNames);
  const productsByTags = useSelector(selectProductsByTags);
  const productsByPrices = useSelector(selectProductsByPrices);
  const filteredProducts = useSelector(selectFilteredProducts(props.sort));

  const user = useSelector(selectUser);
  let sorts = props.sort;

  const sortedProductArray = (s) => {
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
      <Col xs={4} className="mb-5">
        <Card className="h-100 w-100 shadow-sm bg-white rounded">
          <CardHeader className="h5">
            <span class="leftright">
              <b>{pro.name}</b> 👁️:
              {!findUserData(pro.id) ? 0 : mapUserForSeen(pro.id)}
            </span>
          </CardHeader>
          <Link to={`./${pro.id}`}>
            <Card.Img
              variant="bottom"
              src={pro.imageUrl}
              height="400hv"
              width="100%"
              object-fit="cover"
              alt="not found!"
              key={pro.id}
            />
          </Link>
          <CardBody className="card-footer h6">
            <p>
              Category:{" "}
              {Categories.map((cat) => {
                if (cat.id === pro.categoryId) return cat.name;
              })}{" "}
            </p>
            <span className="leftright">
              €{pro.price}
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
          {/* </div> */}
        </Card>
      </Col>
    );
  });
}
