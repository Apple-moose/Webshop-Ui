import { Link, useNavigate } from "react-router-dom";
import { BsCart4, BsFillGrid3X3GapFill } from "react-icons/bs";
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
  console.log(localStorage);
  const localStorageReset = () => {
    localStorage.removeItem("sorting");
    localStorage.removeItem("tokenReceived");
    localStorage.removeItem("userBank");
    localStorage.removeItem("userData");
    console.log(localStorage);
  };

  return (
    <>
      <div className="App-header">
        <span className="Options-header">
          <BsFillGrid3X3GapFill />
          <div class="Options-window">
            <p>&nbsp;LOGIN&nbsp;</p>
            <p>&nbsp;CART&nbsp;</p>
            <p className="small">&nbsp;Clear Cache&nbsp;</p>
            </div>
        </span>
        {!newUserName.me && !userName.me ? (
          <>
            <span>
              Apple-Moose's
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
              <button
                className="buttonLogin"
                onClick={() => navigate("./login")}
              >
                Log in
              </button>
            </span>
          </>
        ) : (
          <>
            <span>
              Apple-Moose's
              <Link to={`./.`}>
                <img
                  src={MooseIcon}
                  alt="moose roadsign"
                  className="logo"
                ></img>
              </Link>
              Welcome {newUserName.me} {userName.me}{" "}
              <button
                className="buttonLogin"
                onClick={() =>
                  dispatch(userLogOut(), dispatch(newUserLogOut()))
                }
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
          <p className="cartToolbarSmall">
            {totalItemInCart} items, total €{totalCartAmount}
          </p>
        </span>
        <button className="buttonLocal" onClick={localStorageReset}>
          Erase Cookies
        </button>
      </div>
    </>
  );
}
