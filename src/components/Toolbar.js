import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import MooseIcon from "./MooseIcon.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBank } from "../store/bank/selectors";
import { selectUser } from "../store/user/selectors";
import { selectAuth } from "../store/auth/selectors";
import { userLogOut } from "../store/auth/slice";
import { newUserLogOut } from "../store/signup/slice";
import { selectSignup } from "../store/signup/selectors";

export default function Toolbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectAuth);
  const newUserName = useSelector(selectSignup);

  const [count] = useState(0);
  const totalCartAmount = useSelector(selectBank);
  const user = useSelector(selectUser);

  const totalItemInCart = user.reduce(
    (value, currentValue) => value + currentValue.buy,
    0
  );

  return (
    <>
      {!newUserName.me && !userName.me ? (
        <>
          <span className="App-header">
            .Apple-Moose's
            {count === 0 ? (
              <Link to={`./.`}>
                <img
                  src={MooseIcon}
                  alt="moose roadsign"
                  className="logo"
                ></img>
              </Link>
            ) : (
              <Link to={`./.`} onClick={(event) => event.preventDefault()}>
                <img
                  src={MooseIcon}
                  alt="moose roadsign"
                  className="logo"
                ></img>
              </Link>
            )}
            Webshop&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="buttonLogin" onClick={() => navigate("./login")}>
              Log in
            </button>
          </span>
        </>
      ) : (
        <>
          <span className="App-header">
            .Apple-Moose's
            {/* {count === 0 ? ( */}
            <Link to={`./.`}>
              <img src={MooseIcon} alt="moose roadsign" className="logo"></img>
            </Link>
            Welcome {newUserName.me} {userName.me}{" "}
            <button
              className="buttonLogin"
              onClick={() => dispatch(userLogOut(), dispatch(newUserLogOut()))}
            >
              Log out!
            </button>
          </span>
        </>
      )}
      <span className="rightBigToolBarCart">
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
    </>
  );
}
