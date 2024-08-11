import "../style/global.scss";
import { BsCart4, BsFillGrid3X3GapFill } from "react-icons/bs";
import MooseIcon from "./MooseIcon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBank } from "../store/bank/selectors";
import { selectUser } from "../store/user/selectors";
import { selectAuth } from "../store/auth/selectors";
import { selectSignup } from "../store/signup/selectors";
import { OptionsMenu, OptionsMenuLogged } from "./OptionsMenu";
import { Col, Image, Row } from "react-bootstrap";

export default function Toolbar() {
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
      <Row className="bg-secondary text-white align-items-center">
        {!newUserName.me && !userName.me ? (
          <>
            <Col md={1} className="text-center ms-4 mb-2 mt-2 fs-1">
              <span className="Options-header">
                <BsFillGrid3X3GapFill size={80} />
                <div class="Options-window">
                  <OptionsMenu />
                </div>
              </span>
            </Col>
            <Col md={8} className="fs-1 ms-2 text-start">
              Apple-Moose's
              {count === 0 ? (
                <Link to={`./.`}>
                  <Image
                    src={MooseIcon}
                    alt="moose roadsign"
                    className="logo"
                    roundedCircle
                  />
                </Link>
              ) : (
                <Link to={`./.`} onClick={(event) => event.preventDefault()}>
                  <Image
                    src={MooseIcon}
                    alt="moose roadsign"
                    className="logo"
                    roundedCircle
                  />
                </Link>
              )}
              Webshop
            </Col>
          </>
        ) : (
          <>
            <Col md={1} className="text-center ms-2 mb-2 mt-2 fs-1">
              <span className="Options-header">
                <BsFillGrid3X3GapFill size={80} />
                <div class="Options-window">
                  <OptionsMenuLogged 
                  userId={userName.userId}
                  userName={userName.me}
                  />
                </div>
              </span>
            </Col>
            <Col md={8} className="fs-1 ms-2 text-start">
              Apple-Moose's
              <Link to={`./.`}>
                <img
                  src={MooseIcon}
                  alt="moose roadsign"
                  className="logo"
                ></img>
              </Link>
              Welcome {newUserName.me} {userName.me}{" "}
            </Col>
          </>
        )}
        <Col className="text-end me-4 fs-2">
          <div>
            go to&nbsp;
            {count === 0 ? (
              <Link to="./Cart" style={{ color: "gold" }}>
                <BsCart4 size={40} />
              </Link>
            ) : (
              <Link
                to="./Cart"
                onClick={(event) => event.preventDefault()}
                style={{ color: "gold" }}
              >
                <BsCart4 size={40} />
              </Link>
            )}
          </div>
          <p className="fs-5">
            {totalItemInCart} items, total €{totalCartAmount}
          </p>
        </Col>
      </Row>
    </>
  );
}
