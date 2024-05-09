import "../App.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchFullProduct } from "../store/productFullPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectFullProduct } from "../store/productFullPage/selectors";
import { selectSeen } from "../store/seen/selectors";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Plants" },
    { id: 4, name: "Books" },
    { id: 7, name: "Games" },
    { id: 8, name: "Sport" },
  ];

  useEffect(() => {
    dispatch(fetchFullProduct(id));
  }, [dispatch, id]);

  const product = useSelector(selectFullProduct);
  const seen = useSelector(selectSeen);
  console.log("newArray:", seen);

  return (
    <>
      <div>
        {!product ? (
          <p>Loading...</p>
        ) : (
          <>
            <img
              className="productFull"
              src={product.imageUrl}
              alt="not found!"
            ></img>
            <p className="productFullTitle">
              <b>{product.name}</b>{" "}
              <p className="productMinimalTxt">
                {categories.map((cat) => {
                  if (cat.id === product.categoryId) return cat.name;
                })}{" "}
                👁️:
                {seen.map((pr) => {
                  if (product.id === pr.id) return pr.seen;
                })}
              </p>
              <p className="productDescTxt">{product.description}</p>
            </p>
            <p>
              €{product.price}{" "}
              <span className="productMinimalTxt">add to cart</span>
            </p>
          </>
        )}
      </div>
    </>
  );
}

/* <p className="meta">
            by: {post.post.developer.name} {""}
            {moment(post.post.createdAt).format("DD-MM-YYYY")} *{" "}
            {post.post.tags.map((p) => (
              <span className="greybox">{p.tag} </span>
            ))}
          </p>
          {/* <ReactMarkdown children={post.post.content} /> */
/* <h2>Comments</h2>
          <p>
            {" "}
            {post.comments.count === 0 ? (
              <p>No Comments so far!🤨</p>
            ) : (
              <>
                {post.comments.rows.map((c) => (
                  <span className="meta">{c.text} </span>
                ))}
              </>
            )}
          </p>
        </>
      )}  */
