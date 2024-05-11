import "../App.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchFullProduct } from "../store/productFullPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import { selectUser } from "../store/user/selectors";
import { selectBank } from "../store/bank/selectors";
import { CartIncrements } from "../components/CartButtons";


export default function UserCartPage() {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Plants" },
    { id: 4, name: "Books" },
    { id: 7, name: "Games" },
    { id: 8, name: "Sport" },
  ];

  const product = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const total = useSelector(selectBank);
  console.log("newArray:", user);


  return (
    <>
      <h1>Your Shopping cart</h1>
      <p>
      {user.map((u) => {
        if (u.buy > 0)
          return (
            <>
              <p>
                {product.map((pr) => {
                  if (pr.id === u.id) {
                    return (
                      <>
                        <span className="cartTxt">{pr.name}</span>
                        <span className="cartButtons">
                          {" "}
                          <CartIncrements
                            key={u.id}
                            id={u.id}
                            buy={u.buy}
                            price={pr.price}
                          />
                          &nbsp;&nbsp;&nbsp; €{pr.price} &nbsp;&nbsp;&nbsp;
                          Total: €{pr.price * u.buy}
                        </span>
                        <hr />
                      </>
                    );
                  }
                })}
              </p>
            </>
          );
      })}
      </p>
      ;<p className="rightBig">total: €{total}</p>
    </>
  );
}

{
  /* <p className="productFullTitle">
          <b>{product.name}</b>{" "}
          <p className="productMinimalTxt">
            {categories.map((cat) => {
              if (cat.id === product.categoryId) return cat.name;
            })}{" "}
            👁️:
            {user.map((pr) => {
              if (product.id === pr.id) return pr.seen;
            })}
          </p>
          <p className="productDescTxt">{product.description}</p>
        </p>
        <span className="leftBig">€{product.price} </span>
        <span className="rightBig">
          {user.map((u) => {
            if (u.id === product.id)
              return u.buy > 0 ? (
                <CartFull key={u.id} id={u.id} buy={u.buy} />
              ) : (
                <CartEmpty key={u.id} id={u.id} />
              );
          })}
        </span> */
}
