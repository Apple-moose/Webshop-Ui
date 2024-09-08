import "../style/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import {
  createProduct,
  modifyProduct,
  fetchProducts,
} from "../store/products/actions";

import { Card, Button, Stack, Modal, Form } from "react-bootstrap";

export default function AdminMenu(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProducts);

  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);
  const [prodSelected, setProdSelected] = useState([]);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImgUrl, setProdImgUrl] = useState("");
  const [prodCategory, setProdCategory] = useState("");

  //   console.log("prodSelected", prodSelected);
  //   console.log("product", product);
  console.log(
    prodSelected.id,
    prodName,
    prodPrice,
    prodDesc,
    prodImgUrl,
    prodCategory
  );
  //   const onClickReviews = () => setShowReviews((value) => !value);
  //   const onClickData = () => setShowData((value) => !value);
  const onClickNewProductForm = () => setShowNewProductForm(true);
  const hideNewProductForm = () => setShowNewProductForm(false);
  const onClickUpdateProductForm = () => setShowUpdateProductForm(true);
  const hideUpdateProductForm = () => setShowUpdateProductForm(false);
  //   const onHideDelete = () => setShowDelete(false);
  //   const findStars = (s) => setStars(s);
  //   const findContent = (c) => setContent(c);
  //   const findReviewId = (r) => setReviewId(r);

  return (
    <>
      <Card>
        <Card.Header className="fs-2 fw-bold text-center">
          Administrator's Menu
        </Card.Header>
        <Stack direction="horizontal" gap={1}>
          <Button
            variant="outline-danger"
            className="fs-4 fw-bold"
            onClick={onClickNewProductForm}
          >
            New Product
          </Button>
          <Button
            variant="outline-success"
            className="fs-4 fw-bold"
            onClick={onClickUpdateProductForm}
          >
            Update product
          </Button>
          <Button
            variant="outline-danger"
            className="fs-4 fw-bold"
            // onClick={() => {
            // dispatch(userLogOut(), dispatch(newUserLogOut()), navigate("./"))
            // }
          >
            Add a new Category
          </Button>
          <Button
            variant="outline-info"
            className="fs-4 fw-bold"
            // onClick={() => {
            // dispatch(userLogOut(), dispatch(newUserLogOut()), navigate("./"))
            // }
          >
            Update Category
          </Button>
        </Stack>
      </Card>

      <Modal show={showNewProductForm} onHide={hideNewProductForm}>
        <Modal.Header closeButton>
          <Modal.Title>New Product Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="product's title"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product's Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="price in €"
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product's Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="->(max 200 characters)"
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Image (Url)</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Image URL"
                value={prodImgUrl}
                onChange={(e) => setProdImgUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product's Category Id</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="#Id"
                value={prodCategory}
                onChange={(e) => setProdCategory(e.target.value)}
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
                createProduct(
                  prodName,
                  prodPrice,
                  prodDesc,
                  prodImgUrl,
                  prodCategory
                )
              )
                .then(() => {
                  hideNewProductForm();
                  dispatch(fetchProducts());
                })
                .catch((error) => {
                  console.error("failed to create new product!!", error);
                });
            }}
          >
            Send New Data
          </Button>
          <Button variant="secondary" onClick={hideNewProductForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* -o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o- */}

      <Modal show={showUpdateProductForm} onHide={hideUpdateProductForm}>
        <Modal.Header closeButton>
          <Form.Select
            value={prodSelected.id}
            onChange={(e) => {
              const selectedProduct = product.find(
                (pr) => pr.id.toString() === e.target.value
              );
              setProdSelected(selectedProduct || "");
            }}
          >
            <option value={""}>Choose a Product to Modify:</option>
            {product.map((pr) => {
              return (
                <option key={pr.id} value={pr.id}>
                  {pr.name}
                </option>
              );
            })}
            ;
          </Form.Select>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={prodSelected.name || "Product's name"}
                value={prodName || prodSelected.name || ""}
                onChange={(e) => setProdName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product's Price</Form.Label>
              <Form.Control
                type="text"
                placeholder={prodSelected.price || "price in €"}
                value={prodPrice || prodSelected.price || ""}
                onChange={(e) => setProdPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product's Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder={
                  prodSelected.description || "Description (max 200ch)"
                }
                value={prodDesc || prodSelected.description || ""}
                onChange={(e) => setProdDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Image (Url)</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder={prodSelected.imageUrl || "image URL"}
                value={prodImgUrl || prodSelected.imageUrl || ""}
                onChange={(e) => setProdImgUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product's Category Id</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder={prodSelected.categoryId || "category id"}
                value={prodCategory || prodSelected.categoryId || ""}
                onChange={(e) => setProdCategory(e.target.value)}
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
                modifyProduct(
                  prodSelected.id,
                  prodName,
                  prodPrice,
                  prodDesc,
                  prodImgUrl,
                  prodCategory
                )
              )
                .then(() => {
                  hideUpdateProductForm();
                  dispatch(fetchProducts());
                })
                .catch((error) => {
                  console.error("failed to create new product!!", error);
                });
            }}
          >
            Update {prodName}
          </Button>
          <Button variant="secondary" onClick={hideUpdateProductForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

{
  /* <Modal show={showDelete} onHide={onHideDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Review?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            type="button"
            variant="warning"
            className="fs-6 fw-bold fst-italic"
            onClick={() => {
              dispatch(deleteReview(reviewId))
                .then(() => {
                  dispatch(fetchMyReviews());
                  onHideDelete();
                })
                .catch((error) => {
                  console.error("failed to delete reviews!!", error);
                });
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={onHideDelete}>
            No
          </Button>
        </Modal.Footer>
      </Modal> */
}
