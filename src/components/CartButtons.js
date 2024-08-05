import "../style/global.scss";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, reduceCart } from "../store/user/slice";
import { addAmount, reduceAmount } from "../store/bank/slice";
import { Text } from "react-native-web";

const CartEmpty = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <Text
          style={{
            float: "right",
            fontSize: 18,
          }}
        >
          Add to Cart
          <button
            className="button2"
            onClick={() => {
              dispatch(addToCart(props.id));
              dispatch(addAmount(props.price));
            }}
          >
            <BsCartPlus size={20} />
          </button>
        </Text>
      </div>
    </>
  );
};
export { CartEmpty };

const CartFull = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <span>
        <Text
          style={{
            float: "right",
            fontSize: 18,
          }}
        >
          <button
            className="button2"
            onClick={() => {
              dispatch(reduceCart(props.id));
              dispatch(reduceAmount(props.price));
            }}
          >
            <BsCartDash size={20} />
          </button>
          {props.buy} in Cart
          <button
            className="button2"
            onClick={() => {
              dispatch(addToCart(props.id));
              dispatch(addAmount(props.price));
            }}
          >
            <BsCartPlus size={20} />
          </button>
        </Text>
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
      <div>
        <Text
          style={{
            float: "right",
            fontSize: 25,
          }}
        >
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
        </Text>
      </div>
    </>
  );
};
export { UserCartEmpty };

const UserCartFull = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <span>
        <Text
          style={{
            float: "right",
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
export { UserCartFull };
