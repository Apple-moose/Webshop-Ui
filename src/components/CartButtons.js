import "../style/global.scss";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, reduceCart } from "../store/user/slice";
import { addAmount, reduceAmount } from "../store/bank/slice";
import { Text } from "react-native-web";
import { Badge } from "react-bootstrap";

const CartEmpty = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Badge pill className="mb-0 pill-large bg-secondary">
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
          }}
        >
          Add to Cart
          <button
            className="buttonWhite"
            onClick={() => {
              dispatch(addToCart(props.id));
              dispatch(addAmount(props.price));
            }}
          >
            <BsCartPlus size={20} />
          </button>
        </Text>
      </Badge>
    </>
  );
};
export { CartEmpty };

const CartFull = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Badge pill className="mb-0 bg-secondary">
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
          }}
        >
          <button
            className="buttonWhite"
            onClick={() => {
              dispatch(reduceCart(props.id));
              dispatch(reduceAmount(props.price));
            }}
          >
            <BsCartDash size={20} />
          </button>
          {props.buy} in Cart
          <button
            className="buttonWhite"
            onClick={() => {
              dispatch(addToCart(props.id));
              dispatch(addAmount(props.price));
            }}
          >
            <BsCartPlus size={20} />
          </button>
        </Text>
      </Badge>
    </>
  );
};
export { CartFull };

const CartIncrements = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <span>
        {" "}
        <Text
          style={{
            float: "center",
            fontSize: 25,
          }}
        >
          <button
            className="button2"
            onClick={() => {
              dispatch(reduceCart(props.id));
              dispatch(reduceAmount(props.price));
            }}
          >
            <BsCartDash size={25} />
          </button>
          {props.buy} in Cart
          <button
            className="button2"
            onClick={() => {
              dispatch(addToCart(props.id));
              dispatch(addAmount(props.price));
            }}
          >
            <BsCartPlus size={25} />
          </button>
        </Text>
      </span>
    </>
  );
};
export { CartIncrements };

const UserCartEmpty = (props) => {
  const dispatch = useDispatch();

  return (
    <>
          Add to Cart
          <button
            className="button2"
            onClick={() => {
              dispatch(addToCart(props.id));
              dispatch(addAmount(props.price));
            }}
          >
            <BsCartPlus size={25} />
          </button>
    </>
  );
};
export { UserCartEmpty };

const UserCartFull = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="button2"
        onClick={() => {
          dispatch(reduceCart(props.id));
          dispatch(reduceAmount(props.price));
        }}
      >
        <BsCartDash size={25} />
      </button>
      {props.buy} in Cart
      <button
        className="button2"
        onClick={() => {
          dispatch(addToCart(props.id));
          dispatch(addAmount(props.price));
        }}
      >
        <BsCartPlus size={25} />
      </button>
    </>
  );
};
export { UserCartFull };
