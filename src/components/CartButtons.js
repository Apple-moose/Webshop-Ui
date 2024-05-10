import "../App.css";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, reduceCart } from "../store/user/slice";

const CartEmpty = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <span className="right">
        Add to Cart
        <button
          className="button2"
          onClick={() => dispatch(addToCart(props.id))}
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
          onClick={() => dispatch(reduceCart(props.id))}
        >
          <BsCartDash />
        </button>
        {props.buy} in Cart
        <button
          className="button2"
          onClick={() => dispatch(addToCart(props.id))}
        >
          <BsCartPlus />
        </button>
      </span>
    </>
  );
};
export { CartFull };
