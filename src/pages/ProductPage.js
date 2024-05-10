import "../App.css";
import { BsCartPlus } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchFullProduct } from "../store/productFullPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectFullProduct } from "../store/productFullPage/selectors";
import { selectUser } from "../store/user/selectors";

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
  const user = useSelector(selectUser);
  console.log("newArray:", user);

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
                {user.map((pr) => {
                  if (product.id === pr.id) return pr.seen;
                })}
              </p>
              <p className="productDescTxt">{product.description}</p>
            </p>
            <span className="leftBig">
              €{product.price}{" "}</span>
              <span className="addToCartTxt">add to cart
              <button className="button">
      <BsCartPlus />
      </button >
      </span>
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
