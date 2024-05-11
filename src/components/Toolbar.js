import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import MooseIcon from "./MooseIcon.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { selectAuth } from "../store/auth/selectors";
// import { userLogOut } from "../store/auth/slice";
// import { newUserLogOut } from "../store/signup/slice";
// import { selectSignup } from "../store/signup/selectors";

export default function Toolbar() {
  const [count] = useState(0);
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
            got to
            {count === 0 ? (
              <Link to="./Cart">
                <BsCart4 />
              </Link>
            ) : (
              <Link to="./Cart" onClick={(event) => event.preventDefault()}>
                <BsCart4 />
              </Link>
            )}
          </span>
        </span>
        {/* <hr></hr> */}
      </div>
    </>
  );
}
{
  /* <h2 style={{ color: "white" }}>
        <Link to={"./."}>HOME</Link>
      </h2> */
}
{
  /* <h2 style={{ color: "white" }}>
        {!newUserName.me && !userName.me ? (
          <Link to={"./login"}>login</Link>
        ) : (
          <>
            <h3>
              Welcome {newUserName.me} {userName.me} {""}
              <button
                onClick={() =>
                  dispatch(userLogOut(), dispatch(newUserLogOut()))
                }
              >
                Log out!
              </button>
              <button onClick={() => navigate("./newPost")}>
                Make a Post yourself!
              </button>
            </h3>
          </>
        )}
      </h2> */
}
