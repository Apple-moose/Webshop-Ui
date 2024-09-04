import "../style/global.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFullProduct } from "../store/productFullPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectFullProduct } from "../store/productFullPage/selectors";
import { selectReviews } from "../store/reviews/selectors";
import { selectUser } from "../store/user/selectors";
import { UserCartEmpty, UserCartFull } from "../components/CartButtons";
import Categories from "../components/Categories";
import { fetchReviewsByProdId, writeReview } from "../store/reviews/actions";

import ReviewsDisplay from "../components/Reviews";
import { Text } from "react-native-web";
import {
  Col,
  Container,
  Row,
  Button,
  Image,
  Modal,
  Form,
} from "react-bootstrap";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectFullProduct);
  const reviews = useSelector(selectReviews);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchFullProduct(id));
    dispatch(fetchReviewsByProdId(id));
  }, [dispatch, id]);

  const [showReviews, setShowReviews] = useState(false);
  const onClick = () => setShowReviews((value) => !value);

  const [showForm, setShowForm] = useState(false);
  const [stars, setStars] = useState(null);
  const [content, setContent] = useState(null);

  const onHideForm = () => setShowForm(false);
  const onClickForm = () => setShowForm(true);

  const ProductReviews = () => (
    <Container id="target">
      <Row className="justify-content-end">
        <Col xs={6} className="">
          {reviews.map((r) => {
            if (r.productId === product.id)
              return (
                <ReviewsDisplay
                  key={r.id}
                  imageUrl={r.userImgUrl}
                  author={r.author}
                  prodId={r.productId}
                  content={r.content}
                  stars={r.stars}
                  userId={r.userId}
                  createdAt={r.createdAt}
                  updatedAt={r.updatedAt}
                />
              );
          })}
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      <div>
        {!product ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mooseClick">
              ⭐️Please click on the Moose to go back to the Home Page⭐️
            </div>
            <Container>
              <Row className="mt-5">
                <Col md={6} className="align-self-center text-center">
                  <Image
                    src={product.imageUrl}
                    className="shadow-lg"
                    fluid
                    width="90%"
                    alt="not found!"
                  />
                </Col>
                <Col className="align-self-center">
                  <Row className="fs-2 fw-bold ms-1 mb-2">{product.name}</Row>
                  <Row className="mb-3 fs-5">
                    <Col xs={8}>
                      {Categories.map((cat) => {
                        if (cat.id === product.categoryId)
                          return (
                            <span key={cat.id}>
                              Category:{" "}
                              <Text
                                style={{
                                  fontStyle: "italic",
                                  fontWeight: "bold",
                                  fontSize: 25,
                                }}
                              >
                                {cat.name}
                              </Text>
                            </span>
                          );
                        return null; // Adding return null for safety
                      })}
                    </Col>
                    <Col className="text-end">
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 25,
                        }}
                      >
                        👁️: &nbsp;
                        {user.map((u) => {
                          if (product.id === u.id)
                            return (
                              <span key={u.id}>{!u.seen ? 0 : u.seen}</span>
                            );
                          return null;
                        })}
                      </Text>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Text
                      style={{
                        textAlign: "justify",
                        fontSize: 20,
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;{product.description}
                    </Text>
                  </Row>
                  <Row className="mb-4">
                    <Col className="fs-2 text-start">
                      <span className="exp">€</span>
                      {product.price}
                    </Col>
                    <Col className="fs-3 text-end">
                      {user.map((u) => {
                        if (u.id === product.id)
                          return u.buy > 0 ? (
                            <UserCartFull
                              key={u.id}
                              id={u.id}
                              buy={u.buy}
                              price={product.price}
                            />
                          ) : (
                            <UserCartEmpty
                              key={u.id}
                              id={u.id}
                              price={product.price}
                            />
                          );
                      })}
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col md={6} className="text-end me-1">
                      <Button
                        variant="warning"
                        className="fs-4"
                        onClick={onClick}
                      >
                        {showReviews ? "Hide Reviews" : "Show Reviews"}
                      </Button>
                    </Col>
                  </Row>
                  {!localStorage.userName ? null : (
                    <Row className="mt-3 justify-content-end">
                      <Col md={6} className="text-end me-1">
                        <Button
                          variant="outline-danger"
                          className="fs-5 text-black"
                          onClick={onClickForm}
                        >
                          Write Review
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Container>
            {/* <!-- Force next columns to break to new line --> */}
            <div className="w-100"></div>
            <h2>&nbsp;</h2>
            {showReviews ? <ProductReviews /> : null}
            <Modal show={showForm} onHide={onHideForm}>
              <Modal.Header closeButton>
                <Modal.Title>My Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Stars</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`(insert a number from 1 to 5)`}
                      value={stars}
                      onChange={(e) => setStars(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Review Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      placeholder={`(max 200 characters)`}
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
                    dispatch(
                      writeReview(id, localStorage.userName, stars, content)
                    )
                      .then(() => {
                        dispatch(fetchReviewsByProdId(id));
                        onHideForm();
                        onClick();
                      })
                      .catch((error) => {
                        console.error("failed to reload reviews!!", error);
                      });
                  }}
                >
                  Send Review
                </Button>
                <Button variant="secondary" onClick={onHideForm}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}
