import "../style/global.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../store/auth/slice";
import { newUserLogOut } from "../store/signup/slice";
import { selectAuth } from "../store/auth/selectors";
import { Card, Button, Stack } from "react-bootstrap";

function ReviewUpdateForm() {
  const navigate = useNavigate();

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
        </Stack>
      </Card>
    </>
  );
}
export { ReviewUpdateForm };