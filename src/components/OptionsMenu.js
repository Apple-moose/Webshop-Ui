import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../store/auth/slice";
import { newUserLogOut } from "../store/signup/slice";
import "../style/global.scss";
import { Toast } from "react-bootstrap";

function OptionsMenu({ toggle }) {
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
      <Toast onClose={() => toggle(false)}>
        <Toast.Header>
          <strong className="mr-auto">OptionsMenu</strong>
        </Toast.Header>
        <p>
          {" "}
          <button className="buttonMenu" onClick={() => navigate("./login")}>
            My Account
          </button>
        </p>
        <p>
          <button className="buttonMenu" onClick={() => navigate("./Cart")}>
            My Purchases
          </button>
        </p>
        <p>
          <button className="buttonMenu" onClick={localStorageReset}>
            Clear Cache
          </button>
        </p>
      </Toast>
    </>
  );
}
export { OptionsMenu };

function OptionsMenuLogged({ toggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Toast onClose={() => toggle(false)}>
        <Toast.Header>
          <button
            className="buttonMenu"
            onClick={() =>
              dispatch(userLogOut(), dispatch(newUserLogOut()), navigate("./"))
            }
          >
            Log out
          </button>
          <p>
            <button className="buttonMenu" onClick={() => navigate("./Cart")}>
              Go to Cart
            </button>
          </p>
        </Toast.Header>
      </Toast>
    </>
  );
}
export { OptionsMenuLogged };
