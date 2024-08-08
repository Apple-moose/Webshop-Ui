import "../App.css";
import { React } from "react";
import { BsPersonCircle } from "react-icons/bs";
import dateFormat from "dateformat";
import { Row, Col, Card, CardBody } from "react-bootstrap";

export default function ReviewsDisplay(props) {
  const profileImg = {
    width: "1.5rem",
  };

  return (
    <>
      <Col md={12} className="mb-4 fs-5">
        <Card className="shadow-lg border-0 bg-white rounded">
          <CardBody>
            <Row className="Justify-content-left mb-2">
              <Col xs={1}>
                {!props.imageUrl ? (
                  <BsPersonCircle />
                ) : (
                  <Card.Img
                    style={profileImg}
                    src={props.imageUrl}
                    alt="."
                    key={props.id}
                  />
                )}
              </Col>
              <Col className="fs-4">{props.author}</Col>
            </Row>
            <Row className="fs-3 mb-2 me-1">
              <div>
                {[...Array(props.stars)].map((e, i) => (
                  <span key={i}>⭐️ </span>
                ))}
              </div>
            </Row>
            <Row className="fs-6 mb-2">
              <p>
                <span style={{ fontWeight: "bold" }}>Last Updated: </span>
                {dateFormat(props.updatedAt, "dddd, mmmm dS, yyyy")}
              </p>
            </Row>
            <Row className="justify-content-left">
              &nbsp;&nbsp;&nbsp;{props.content}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
