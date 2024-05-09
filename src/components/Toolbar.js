import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { selectAuth } from "../store/auth/selectors";
// import { userLogOut } from "../store/auth/slice";
// import { newUserLogOut } from "../store/signup/slice";
// import { selectSignup } from "../store/signup/selectors";
// import UserPostPage from "../pages/UserPostPage";

export default function Toolbar() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const userName = useSelector(selectAuth);
  //   const newUserName = useSelector(selectSignup);

  return (
    <div>
      <Link to={`./.`}>
        <h1>Apple-Moose's Webshop</h1>
      </Link>
      <hr></hr>
      {/* <h2 style={{ color: "white" }}>
        <Link to={"./."}>HOME</Link>
      </h2> */}
      {/* <h2 style={{ color: "white" }}>
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
      </h2> */}
    </div>
  );
}
