import "../App.css";
import { Link } from "react-router-dom";
// import "./Styles.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import { selectSeen } from "../store/seen/selectors";
import { fetchProducts } from "../store/products/actions";
import { productSeen } from "../store/seen/slice";

export default function ProductBlock() {
  const dispatch = useDispatch();
  const product = useSelector(selectProducts);
  const seen = useSelector(selectSeen);

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
  }, [dispatch]);

  // console.log(product);

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
              👁️:
              {seen.map((pr) => {
                if (pro.id === pr.id) return pr.seen;
              })}{" "}
            </span>
          </p>
          <p>
            €{pro.price} <span className="right">add to cart</span>
          </p>
        </div>
        {/* <button
            onClick={() => dispatch(toggleFavorite(pizza.id))}
            className={`fav-toggle ${
              user.favorites.includes(pizza.id) ? "fav" : ""
            }`}
          >
            {" "}
            {user.favorites.includes(pizza.id) ? "♥️" : "♡"}
          </button>{" "} */}
        {/* <div className="overlay">
            <span>{p.description}</span>
            <span>
              <strong>was bought:</strong> {pizza.bought} times
            </span>
          </div> */}
      </>
    );
  });
}
