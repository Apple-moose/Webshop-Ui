import "../style/global.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReviews } from "../store/reviews/selectors";
import { BsPersonCircle } from "react-icons/bs";
import dateFormat from "dateformat";
import { selectProducts } from "../store/products/selectors";
import { selectAuth } from "../store/auth/selectors";
import { getMyUserData } from "../store/auth/actions";
import ReviewsDisplay from "../components/Reviews";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import { fetchMyReviews, modifyReview } from "../store/reviews/actions";

export default function UserAccountPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyUserData());
    dispatch(fetchMyReviews());
  }, [dispatch]);

  const myReviews = useSelector(selectReviews);
  const user = useSelector(selectAuth);
  const product = useSelector(selectProducts);

  const [showReviews, setShowReviews] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [stars, setStars] = useState(null);
  const [content, setContent] = useState(null);
  const [reviewId, setReviewId] = useState(0);

  const onClickReviews = () => setShowReviews((value) => !value);
  const onClickData = () => setShowData((value) => !value);
  const onClickForm = () => setShowForm(true);
  const onHideForm = () => setShowForm(false);
  const findStars = (s) => setStars(s);
  const findContent = (c) => setContent(c);
  const findReviewId = (r) => setReviewId(r);

  const profileImg = {
    width: "10rem",
  };

  const findProductName = (prId) => {
    return product.map((p) => {
      if (p.id === prId) return p.name;
    });
  };

  return (
    <>
      <Container>
        <Row className="">
          <Col md={12} className="h1 mt-5 mb-5 fw-bold text-center">
            ⭐️{user.me}'s user Page⭐️
          </Col>
        </Row>
        <Row>
          <Col md={6} className="ms-1 me-1 mb-3 fs-3 text-center">
            {!user.userData.imageUrl ? (
              <BsPersonCircle size={90} />
            ) : (
              <Image
                style={profileImg}
                src={user.userData.imageUrl}
                alt=".not found!"
                key={user.userData.id}
              />
            )}
            <p>
              User Name: <b>{user.userData.firstname}</b>
            </p>
            <p>
              Email address: <b>{user.userData.email}</b>
            </p>
            <Button
              variant="warning"
              className="ms-3 fs-4"
              onClick={onClickData}
            >
              {showData ? "Show less" : "Show more"}
            </Button>
            {/* <!-- Force next columns to break to new line --> */}
            <div class="w-100"></div>
            {showData ? (
              <>
                <div className="fs-4 text-start">
                  <p>
                    User Id: <b>{user.userData.id}</b>
                  </p>
                  <p>
                    First Name: <b>{user.userData.firstname}</b>
                    {/* <Button
                      variant="outline-success"
                      style={{ fontSize: "0.8rem", marginTop: "0.8rem" }}
                      className="ms-5 mb-3 "
                      onClick={onClickReviews}
                    >
                      👉Update
                    </Button> */}
                  </p>
                  <p>
                    Last Name: <b>{user.userData.lastname}</b>
                    {/* <Button
                      variant="outline-success"
                      style={{ fontSize: "0.8rem", marginTop: "0.8rem" }}
                      className="ms-5 mb-3 "
                      onClick={onClickReviews}
                    >
                      👉Update
                    </Button> */}
                  </p>
                  <p>
                    Email address: <b>{user.userData.email}</b>
                    {/* <Button
                      variant="outline-success"
                      style={{ fontSize: "0.8rem", marginTop: "0.8rem" }}
                      className="ms-5 mb-3 "
                      onClick={onClickReviews}
                    >
                      👉Update
                    </Button> */}
                  </p>
                  <p>
                    Profile Image URL: <b>{user.userData.imageUrl}</b>
                    {/* <Button
                      variant="outline-success"
                      style={{ fontSize: "0.8rem", marginTop: "0.8rem" }}
                      className="ms-5 mb-3 "
                      onClick={onClickReviews}
                    >
                      👉Update
                    </Button> */}
                  </p>
                  <p>
                    Profile Creation date:{" "}
                    <b>
                      {dateFormat(
                        user.userData.createdAt,
                        "dddd, mmmm dS, yyyy"
                      )}
                    </b>
                  </p>
                  <p>
                    Last Profile Update:{" "}
                    <b>
                      {dateFormat(
                        user.userData.updatedAt,
                        "dddd, mmmm dS, yyyy"
                      )}
                    </b>
                  </p>
                </div>
              </>
            ) : null}
          </Col>
          <Col>
            <Button
              variant="warning"
              className="ms-3 fs-4"
              onClick={onClickReviews}
            >
              {showReviews ? "Hide  my Reviews" : "Show my Reviews"}
            </Button>
            {/* <!-- Force next columns to break to new line --> */}
            <div class="w-100"></div>
            <h2>&nbsp;</h2>
            {showReviews ? (
              <Container id="target">
                <Row className="justify-content-end">
                  <Col xs={12} className="">
                    {myReviews.map((r) => {
                      return (
                        <>
                          <div>
                            <Card className="fs-5 mt-1 mb-1 fw-bold fst-italic bg-white rounded text-left">
                              👉{findProductName(r.productId)}
                            </Card>
                            <ReviewsDisplay
                              reviewId={r.id}
                              imageUrl={r.userImgUrl}
                              author={r.author}
                              prodId={r.productId}
                              content={r.content}
                              stars={r.stars}
                              userId={r.userId}
                              createdAt={r.createdAt}
                              updatedAt={r.updatedAt}
                            />
                            <Button
                              variant="success"
                              className="mb-3 fs-6"
                              onClick={() => {
                                dispatch(onClickForm);
                                findStars(r.stars);
                                findContent(r.content);
                                findReviewId(r.id);
                              }}
                            >
                              Modify my Review
                            </Button>{" "}
                            <Button
                              variant="outline-danger"
                              className="mb-3 fs-6"
                              // onClick={onClickReviews}
                            >
                              Erase my Review
                            </Button>
                          </div>
                        </>
                      );
                    })}
                  </Col>
                </Row>
              </Container>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Modal show={showForm} onHide={onHideForm}>
        <Modal.Header closeButton>
          <Modal.Title>Review Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Stars</Form.Label>
              <Form.Control
                type="text"
                placeholder={`current: ${stars} ->(insert a number from 1 to 5)`}
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                autoFocus //put cursor in this field
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder={`${content} ->(max 200 characters)`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="warning"
            className="fs-6 fw-bold fst-italic"
            onClick={() => {
              dispatch(modifyReview(reviewId, stars, content))
                .then(() => {
                  dispatch(fetchMyReviews());
                  onHideForm();
                })
                .catch((error) => {
                  console.error("failed to reload reviews!!", error);
                });
            }}
          >
            Send Updates
          </Button>
          <Button variant="secondary" onClick={onHideForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
