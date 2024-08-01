import "../App.css";
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
      if (u.id === proId) return (
      !u.seen ? 0 : u.seen)
    });
  };


  return sortedProductArray(sorts).map((pro) => {
    return (
      <>
        <div className="productDisplay">
          <Link to={`./${pro.id}`}>
            <button onClick={() => dispatch(productSeen(pro.id))}>
              <img
                className="product"
                src={pro.imageUrl}
                alt="not found!"
                key={pro.id}
              ></img>
            </button>
          </Link>
          <p>
            <b>{pro.name}</b>{" "}
            <span className="right">
              👁️:
              {!findUserData(pro.id) ? 0 : mapUserForSeen(pro.id)}
            </span>
            <p>
              Category:{" "}
              {Categories.map((cat) => {
                if (cat.id === pro.categoryId) return cat.name;
              })}{" "}
            </p>
          </p>
          <span className="left">€{pro.price} </span>
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
          )}
        </div>
      </>
    );
  });
}
