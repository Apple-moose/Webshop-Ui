import "../App.css";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, reduceCart } from "../store/user/slice";
import { addAmount, reduceAmount } from "../store/bank/slice";

const CartEmpty = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <span className="right">
        Add to Cart
        <button
          className="button2"
          onClick={() => {
            dispatch(addToCart(props.id));
            dispatch(addAmount(props.price));
          }}
        >
          <BsCartPlus />
        </button>
      </span>
    </>
  );
};
export { CartEmpty };

const CartFull = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <span className="right">
        <button
          className="button2"
          onClick={() => {
            dispatch(reduceCart(props.id));
            dispatch(reduceAmount(props.price));
          }}
        >
          <BsCartDash />
        </button>
        {props.buy} in Cart
        <button
          className="button2"
          onClick={() => {
            dispatch(addToCart(props.id));
            dispatch(addAmount(props.price));
          }}
        >
          <BsCartPlus />
        </button>
      </span>
    </>
  );
};
export { CartFull };

const CartIncrements = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <span>
        <button
          className="button2"
          onClick={() => {
            dispatch(reduceCart(props.id));
            dispatch(reduceAmount(props.price));
          }}
        >
          <BsCartDash />
        </button>
        {props.buy} in Cart
        <button
          className="button2"
          onClick={() => {
            dispatch(addToCart(props.id));
            dispatch(addAmount(props.price));
          }}
        >
          <BsCartPlus />
        </button>
      </span>
    </>
  );
};
export { CartIncrements };
