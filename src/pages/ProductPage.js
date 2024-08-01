import "../App.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchFullProduct } from "../store/productFullPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectFullProduct } from "../store/productFullPage/selectors";
import { selectUser } from "../store/user/selectors";
import { CartEmpty, CartFull } from "../components/CartButtons";
import Categories from "../components/Categories";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFullProduct(id));
  }, [dispatch, id]);

  const product = useSelector(selectFullProduct);
  const user = useSelector(selectUser);

  return (
    <>
      <div>
        {!product ? (
          <p>Loading...</p>
        ) : (
          <>
            ⭐️Please click on the Moose to go back to the Home PagePage⭐️
            <img
              className="productFull"
              src={product.imageUrl}
              alt="not found!"
            ></img>
            <p className="productFullTitle">
              <b>{product.name}</b>{" "}
              <p className="productMinimalTxt">
                {Categories.map((cat) => {
                  if (cat.id === product.categoryId) return cat.name;
                })}{" "}
                👁️:
                {user.map((u) => {
                  if (product.id === u.id) return !u.seen ? 0 : u.seen;
                })}
              </p>
              <p className="productDescTxt">{product.description}</p>
            </p>
            <span className="leftBig">€{product.price} </span>
            <span className="rightBig">
              {user.map((u) => {
                if (u.id === product.id)
                  return u.buy > 0 ? (
                    <CartFull 
                      key={u.id}
                      id={u.id}
                      buy={u.buy}
                      price={product.price}
                    />
                  ) : (
                    <CartEmpty key={u.id} id={u.id} price={product.price} />
                  );
              })}
            </span>
          </>
        )}
      </div>
    </>
  );
}
