import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProducts } from "../store/products/selectors";
import { selectUser } from "../store/user/selectors";
import { selectBank } from "../store/bank/selectors";
import { CartIncrements } from "../components/CartButtons";
import { resetCartData } from "../store/user/slice";
import { reset } from "../store/bank/slice";

export default function UserCartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const total = useSelector(selectBank);
  console.log("newArray:", user);

  // const goToBuyPage = (event) => {
  //   navigate(`./${event.target.value}`);
  // };

  if (total === 0) return <h1>Your Shopping Cart is Empty!</h1>;
  else
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
        <div>
          <p className="rightBig">total: €{total}</p>
        </div>
        <p>
          <div>
            <p>
              <button
                className="buttonBuy"
                onClick={() => {
                  dispatch(resetCartData());
                  dispatch(reset());
                  navigate("/Buy");
                }}
              >
                Buy
              </button>
            </p>
            <p>
              <button
                className="buttonReset"
                onClick={() => {
                  dispatch(resetCartData());
                  dispatch(reset());
                }}
              >
                reset
              </button>
            </p>
          </div>
        </p>
      </>
    );
}
