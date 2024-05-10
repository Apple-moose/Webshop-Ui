import "../App.css";
import { Link } from "react-router-dom";
// import "./Styles.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import { selectUser } from "../store/user/selectors";
import { fetchProducts } from "../store/products/actions";
import { productSeen } from "../store/user/slice";
import { CartEmpty, CartFull } from "./CartButtons";

export default function ProductBlock() {
  const dispatch = useDispatch();
  const product = useSelector(selectProducts);
  const user = useSelector(selectUser);

  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Plants" },
    { id: 4, name: "Books" },
    { id: 7, name: "Games" },
    { id: 8, name: "Sport" },
  ];
  useEffect(() => {
    dispatch(fetchProducts);
    // dispatch(pushInUserArray)
  }, [dispatch]);


  console.log("Buying array?:", user);

  return product.map((pro) => {
    return (
      <>
        <div className="productDisplay">
          <Link to={`./${pro.id}`}>
            <button onClick={() => dispatch(productSeen(pro.id))}>
              <img
                className="product"
                src={pro.imageUrl}
                alt="not found!"
              ></img>
            </button>
          </Link>
          <p>
            <b>{pro.name}</b>{" "}
            <span className="right">
              tag:{" "}
              {categories.map((cat) => {
                if (cat.id === pro.categoryId) return cat.name;
              })}{" "}
              👁️
              {user.map((pr) => {
                if (pro.id === pr.id) {
                  return `:${pr.seen}`;
                }
              })}{" "}
            </span>
          </p>
          <span className="left">€{pro.price} </span>
          {user.map((u) => {
            if (u.id === pro.id)
              return u.buy > 0 ? (
                <CartFull key={u.id} id={u.id} buy={u.buy} />
              ) : (
                <CartEmpty key={u.id} id={u.id} />
              );
          })}
          ;
        </div>
      </>
    );
  });
}
