// import "../App.css";
import "../style/global.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
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

  return (
    <>
      <div>
        {!product ? (
          <p>Loading...</p>
        ) : (
          <>
            <div class="mooseClick">⭐️Please click on the Moose to go back to the Home Page⭐️</div>
            <main class="container">
              <div class="row">
                <div class="col-6">
                  <img
                    class="col-11"
                    src={product.imageUrl}
                    alt="not found!"
                  ></img>
                </div>
                <div class="col align-self-center">
                  <p class="col-11">
                    <h1>
                      <b>{product.name}</b>
                    </h1>
                  </p>
                  <p class="row">
                    <div class="leftright">
                      <span>
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
                      </span>
                      <span>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 25,
                          }}
                        >
                          👁️: &nbsp;
                          {user.map((u) => {
                            if (product.id === u.id)
                              return !u.seen ? 0 : u.seen;
                          })}
                        </Text>
                      </span>
                    </div>
                  </p>
                  <div>
                    <Text
                      style={{
                        textAlign: "justify",
                        fontSize: 20,
                      }}
                    >
                      <p>{product.description}</p>
                    </Text>
                  </div>
                  <div>
                    <Text
                      style={{
                        float: "left",
                        fontSize: 25,
                      }}
                    >
                      <span class="exp">€</span>
                      <span> {product.price} </span>
                    </Text>
                    <span>
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
                    </span>
                  </div>
                </div>
                {/* <!-- Force next columns to break to new line --> */}
                <div class="w-100"></div>
                <div>
                  <p>
                    {reviews.map((r) => {
                      if (r.productId === product.id)
                        return (
                          <ReviewsDisplay
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
                  </p>
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
}
