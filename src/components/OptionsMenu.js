import "../style/global.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../store/auth/slice";
import { newUserLogOut } from "../store/signup/slice";
import { selectAuth } from "../store/auth/selectors";
import { selectSignup } from "../store/signup/selectors";
import { Card, Button, Stack } from "react-bootstrap";

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
      <Card>
        <Card.Header className="fs-2 fw-bold text-center rounded">
          👉Options Menu👈
        </Card.Header>
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="warning"
            className="fs-2 fw-bold"
            onClick={() => navigate("./login")}
          >
            User Login
          </Button>

          <Button className="fs-2 fw-bold" onClick={() => navigate("./Cart")}>
            My Purchases
          </Button>

          <Button
            variant="danger"
            className="fs-2 fw-bold"
            onClick={localStorageReset}
          >
            Clear Cache
          </Button>
        </Stack>
      </Card>
    </>
  );
}
export { OptionsMenu };

function OptionsMenuLogged() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const signup = useSelector(selectSignup);

  return (
    <>
      <Card>
        <Card.Header className="fs-2 fw-bold text-center">
          👉Options Menu👈
        </Card.Header>
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="outline-success"
            className="fs-2 fw-bold"
            onClick={() => navigate("./Cart")}
          >
            Pending Purchases
          </Button>
          <Button
            variant="outline-danger"
            className="fs-2 fw-bold"
            onClick={() => navigate(`./User/${auth.userId || signup.userId}`)}
          >
            {auth.me || signup.me}'s User Page
          </Button>
          <Button
            variant="outline-info"
            className="fs-2 fw-bold"
            onClick={() =>
              dispatch(userLogOut(), dispatch(newUserLogOut()), navigate("./"))
            }
          >
            Log me out
          </Button>
        </Stack>
      </Card>
    </>
  );
}
export { OptionsMenuLogged };
