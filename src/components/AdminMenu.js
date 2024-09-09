import "../style/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import {
  createProduct,
  modifyProduct,
  fetchProducts,
} from "../store/products/actions";

import { Card, Button, Stack, Modal, Form } from "react-bootstrap";

export default function AdminMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProducts);

  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [prodSelected, setProdSelected] = useState({});
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImgUrl, setProdImgUrl] = useState("");
  const [prodCategory, setProdCategory] = useState("");

  const onClickNewProductForm = () => setShowNewProductForm(true);
  const hideNewProductForm = () => setShowNewProductForm(false);
  const onClickUpdateProductForm = () => setShowUpdateProductForm(true);
  const hideUpdateProductForm = () => setShowUpdateProductForm(false);
  const onClickShowConfirmation = () => setShowConfirmation(true);
  const hideConfirmation = () => setShowConfirmation(false);
  const handleProductChange = (product) => {
    setProdSelected(product);
    setProdName(product.name || "");
    setProdPrice(product.price || "");
    setProdDesc(product.description || "");
    setProdImgUrl(product.imageUrl || "");
    setProdCategory(product.categoryId || "");
  };

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
              <Form.Label htmlFor="newName">Product's Name</Form.Label>
              <Form.Control
                id="newName"
                name="newName"
                type="text"
                placeholder="product's title"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                autoFocus
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="newPrice">Product's Price</Form.Label>
              <Form.Control
                id="newPrice"
                name="newPrice"
                type="text"
                placeholder="price in €"
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="newDesc">Product's Description</Form.Label>
              <Form.Control
                id="newDesc"
                name="newDesc"
                as="textarea"
                rows={8}
                placeholder="->(max 200 characters)"
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="newUrl">Product Image (Url)</Form.Label>
              <Form.Control
                id="newUrl"
                name="newUrl"
                as="textarea"
                rows={1}
                placeholder="Image URL"
                value={prodImgUrl}
                onChange={(e) => setProdImgUrl(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="newCatId">Product's Category Id</Form.Label>
              <Form.Control
                id="newCatId"
                name="newCatId"
                as="textarea"
                rows={1}
                placeholder="#Id"
                value={prodCategory}
                onChange={(e) => setProdCategory(e.target.value)}
                autoComplete="off"
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
            id="productSelect"
            name="productSelect"
            value={prodSelected.id || ""}
            onChange={(e) => {
              const selectedProduct = product.find(
                (pr) => pr.id.toString() === e.target.value
              );
              handleProductChange(selectedProduct || {});
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
              <Form.Label htmlFor="prodname">Product's Name</Form.Label>
              <Form.Control
                id="prodname"
                name="prodname"
                type="text"
                placeholder={prodSelected.name || "Product's name"}
                value={prodName || prodSelected.name || ""}
                onChange={(e) => setProdName(e.target.value)}
                autoFocus
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="prodprice">Product's Price</Form.Label>
              <Form.Control
                id="prodprice"
                name="prodprice"
                type="text"
                placeholder={prodSelected.price || "price in €"}
                value={prodPrice || prodSelected.price || ""}
                onChange={(e) => setProdPrice(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="proddesc">Product's Description</Form.Label>
              <Form.Control
                id="proddesc"
                name="proddesc"
                as="textarea"
                rows={8}
                placeholder={
                  prodSelected.description || "Description (max 200ch)"
                }
                value={prodDesc || prodSelected.description || ""}
                onChange={(e) => setProdDesc(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="produrl">Product Image (Url)</Form.Label>
              <Form.Control
                id="produrl"
                name="produrl"
                as="textarea"
                rows={1}
                placeholder={prodSelected.imageUrl || "image URL"}
                value={prodImgUrl || prodSelected.imageUrl || ""}
                onChange={(e) => setProdImgUrl(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="prodcatId">Product's Category Id</Form.Label>
              <Form.Control
                id="prodcatId"
                name="prodcatId"
                as="textarea"
                rows={1}
                placeholder={prodSelected.categoryId || "category id"}
                value={prodCategory || prodSelected.categoryId || ""}
                onChange={(e) => setProdCategory(e.target.value)}
                autoComplete="off"
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
                  onClickShowConfirmation();
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

      <Modal show={showConfirmation} onHide={hideConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>⭐️Operation Successful⭐️</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            type="button"
            variant="warning"
            className="fs-6 fw-bold fst-italic"
            onClick={() => navigate(`../${prodSelected.id}`)}
          >
            Go to Product
          </Button>
          <Button variant="secondary" onClick={hideConfirmation}>
            Stay in User's page
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
