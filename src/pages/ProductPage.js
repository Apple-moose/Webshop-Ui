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
import { fetchReviewsByProdId } from "../store/reviews/actions";
import ReviewsDisplay from "../components/Reviews";
import { Text } from "react-native-web";
import { Col, Container, Row, Button, Image } from "react-bootstrap";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFullProduct(id));
    dispatch(fetchReviewsByProdId(id));
  }, [dispatch, id]);

  const product = useSelector(selectFullProduct);
  const reviews = useSelector(selectReviews);
  const user = useSelector(selectUser);

  const [showReviews, setShowReviews] = useState(false);
  const onClick = () => setShowReviews((value) => !value);

  const ProductReviews = () => (
    <Container id="target">
      <Row className="justify-content-end">
        <Col xs={6} className="">
          {reviews.map((r) => {
            if (r.productId === product.id)
              return (
                <ReviewsDisplay
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
            <div class="mooseClick">
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
                            <>
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
                            </>
                          );
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
                          if (product.id === u.id) return !u.seen ? 0 : u.seen;
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
                      <span class="exp">€</span>
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
                </Col>
              </Row>
            </Container>
            {/* <!-- Force next columns to break to new line --> */}
            <div class="w-100"></div>
            <h2>&nbsp;</h2>
            {showReviews ? <ProductReviews /> : null}
          </>
        )}
      </div>
    </>
  );
}
