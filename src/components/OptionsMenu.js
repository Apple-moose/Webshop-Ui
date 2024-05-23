import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../store/auth/slice";
import { newUserLogOut } from "../store/signup/slice";

function OptionsMenu() {
  const navigate = useNavigate();
  const localStorageReset = () => {
    localStorage.removeItem("sorting");
    localStorage.removeItem("tokenReceived");
    localStorage.removeItem("userBank");
    localStorage.removeItem("userData");
    console.log(localStorage);
  };

  return (
    <>
      <button className="buttonMenu" onClick={() => navigate("./login")}>
        LOG IN
      </button>
      <p>
        <button className="buttonMenu" onClick={() => navigate("./Cart")}>
          Go to Cart
        </button>
      </p>
      <p>
        <button className="buttonMenu" onClick={localStorageReset}>
          Clear Cache
        </button>
      </p>
    </>
  );
}
export { OptionsMenu };

function OptionsMenuLogged() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <button
        className="buttonMenu"
        onClick={() => dispatch(userLogOut(), dispatch(newUserLogOut()))}
      >
        LOG OUT
      </button>
      <p>
        <button className="buttonMenu" onClick={() => navigate("./Cart")}>
          Go to Cart
        </button>
      </p>
    </>
  );
}
export { OptionsMenuLogged };
