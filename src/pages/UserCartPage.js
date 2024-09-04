import "../style/global.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectProducts } from "../store/products/selectors";
import { selectUser } from "../store/user/selectors";
import { selectBank } from "../store/bank/selectors";
import { CartIncrements } from "../components/CartButtons";
import { resetCartData } from "../store/user/slice";
import { reset } from "../store/bank/slice";
import { Text } from "react-native-web";
import { Button, Stack, Col, Row } from "react-bootstrap";

export default function UserCartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const total = useSelector(selectBank);
  const btn = {
    fontSize: "2rem",
  };

  if (total === 0)
    return (
      <>
        <p>
          <span className="mooseClick">
            ⭐️Please click on the Moose to go back to the HomePage⭐️
          </span>
        </p>
        <h1 style={{ marginLeft: "6rem" }}>Your Shopping Cart is Empty 🙁!</h1>
      </>
    );
  else
    return (
      <>
        <h3>&nbsp;</h3>
        <h1>&nbsp;&nbsp;Your Shopping cart</h1>
        <h1>&nbsp;</h1>
        <main className="container-fluid">
          <div>
            {user.map((u) => {
              if (u.buy > 0)
                return (
                  <>
                    <p>
                      {product.map((pr) => {
                        if (pr.id === u.id) {
                          return (
                            <>
                              <Text
                                style={{
                                  fontSize: 25,
                                  textAlign: "left",
                                }}
                              >
                                <div className="row justify-content-between">
                                <div className="col-1">
                                <Link to={`../${pr.id}`}>
                                  <img
                                    width="100%"
                                    src={pr.imageUrl}
                                    alt="not found!"
                                  ></img></Link></div>
                                  <div
                                    className="col-3 align-self-center"
                                    style={{
                                      textAlign: "left",
                                      marginLeft: "0.5rem",
                                    }}
                                  >
                                    <span>&nbsp;{pr.name}</span>
                                  </div>

                                  <div className="col-2 align-self-center">
                                    unit: <span className="exp">€</span>
                                    {pr.price}{" "}
                                  </div>
                                  <div
                                    className="col-3 align-self-center"
                                    style={{ textAlign: "right" }}
                                  >
                                    <CartIncrements
                                      key={u.id}
                                      id={u.id}
                                      buy={u.buy}
                                      price={pr.price}
                                    />
                                  </div>
                                  <div
                                    className="col-2 align-self-center"
                                    style={{ textAlign: "right" }}
                                  >
                                    Total: <span className="exp">€</span>
                                    {pr.price * u.buy}&nbsp;&nbsp;
                                  </div>
                                  <hr />
                                </div>
                              </Text>
                            </>
                          );
                        }
                      })}
                    </p>
                  </>
                );
            })}
          </div>
        </main>
        <main className="container-fluid">
          <Row className="justify-content-end">
            <Col md="3">
              <Stack gap={4}>
                <Text
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginRight: "0rem",
                    marginBottom: "2rem",
                    top: "1rem",
                    float: "right",
                  }}
                >
                  Total Amount: <span className="exp">€</span>
                  {total}
                </Text>
                <Button
                  variant="secondary"
                  style={btn}
                  onClick={() => {
                    dispatch(resetCartData());
                    dispatch(reset());
                    navigate("/Buy");
                  }}
                >
                  Buy
                </Button>
                <Button
                  variant="outline-secondary"
                  style={btn}
                  onClick={() => {
                    dispatch(resetCartData());
                    dispatch(reset());
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </Col>
          </Row>
        </main>
      </>
    );
}
