import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import MooseIcon from "./MooseIcon.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBank } from "../store/bank/selectors";
import { selectUser } from "../store/user/selectors";
// import { selectAuth } from "../store/auth/selectors";
// import { userLogOut } from "../store/auth/slice";
// import { newUserLogOut } from "../store/signup/slice";
// import { selectSignup } from "../store/signup/selectors";

export default function Toolbar() {
  const [count] = useState(0);
  const totalCartAmount = useSelector(selectBank);
  const user = useSelector(selectUser);

  const totalItemInCart = user.reduce(
    (value, currentValue) => value + currentValue.buy,
    0
  );

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const userName = useSelector(selectAuth);
  //   const newUserName = useSelector(selectSignup);

  return (
    <>
      <div>
        <span className="App-header">
          .Apple-Moose's
          {count === 0 ? (
            <Link to={`./.`}>
              <img src={MooseIcon} alt="moose roadsign" className="logo"></img>
            </Link>
          ) : (
            <Link to={`./.`} onClick={(event) => event.preventDefault()}>
              <img src={MooseIcon} alt="moose roadsign" className="logo"></img>
            </Link>
          )}
          Webshop{" "}
          <span className="rightBig">
            go to&nbsp;
            {count === 0 ? (
              <Link to="./Cart">
                <BsCart4 />
              </Link>
            ) : (
              <Link to="./Cart" onClick={(event) => event.preventDefault()}>
                <BsCart4 />
              </Link>
            )} 
            <p className="rightSmall">
              {totalItemInCart} items, total €{totalCartAmount}
            </p>
          </span>
        </span>
      </div>
    </>
  );
}
