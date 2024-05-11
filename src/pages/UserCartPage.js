import "../App.css";
import { useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import { selectUser } from "../store/user/selectors";
import { selectBank } from "../store/bank/selectors";
import { CartIncrements } from "../components/CartButtons";

export default function UserCartPage() {
  const product = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const total = useSelector(selectBank);
  console.log("newArray:", user);

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
        ;<p className="rightBig">total: €{total}</p>
      </>
    );
}
