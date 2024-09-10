import "../style/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import { selectCategory } from "../store/category/selectors";
import {
  createProduct,
  modifyProduct,
  fetchProducts,
  deleteProduct,
} from "../store/products/actions";
import {
  fetchCategory,
  modifyCategory,
  createCategory,
} from "../store/category/actions";
import { Card, Button, Stack, Modal, Form } from "react-bootstrap";

export default function AdminMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProducts);
  const category = useSelector(selectCategory);

  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);
  const [showDeleteProductForm, setShowDeleteProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [prodSelected, setProdSelected] = useState({});
  const [prodId, setProdId] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodImgUrl, setProdImgUrl] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryNameUpdated, setCategoryNameUpdated] = useState("");

  const onClickNewProductForm = () => setShowNewProductForm(true);
  const hideNewProductForm = () => setShowNewProductForm(false);
  const onClickUpdateProductForm = () => setShowUpdateProductForm(true);
  const onClickDeleteProductForm = () => setShowDeleteProductForm(true);
  const onClickUpdateCategoryForm = () => setShowCategoryForm(true);
  const hideUpdateProductForm = () => setShowUpdateProductForm(false);
  const hideDeleteProductForm = () => setShowDeleteProductForm(false);
  const hideCategoryForm = () => setShowCategoryForm(false);
  const hideSuccess = () => setShowSuccess(false);
  const onClickShowConfirmation = () => setShowConfirmation(true);
  const hideConfirmation = () => setShowConfirmation(false);
  const onClickDelete = () => setShowDelete(true);
  const onHideDelete = () => setShowDelete(false);

  const handleProductChange = (product) => {
    setProdSelected(product);
    setProdId(product.id || "");
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
            className="fs-5 fw-bold"
            onClick={onClickNewProductForm}
          >
            New Product
          </Button>
          <Button
            variant="outline-success"
            className="fs-5 fw-bold"
            onClick={onClickUpdateProductForm}
          >
            Update product
          </Button>
          <Button
            variant="outline-danger"
            className="fs-5 fw-bold"
            onClick={() => {
              onClickDeleteProductForm();
            }}
          >
            Delete Product
          </Button>
          <Button
            variant="outline-info"
            className="fs-5 fw-bold"
            onClick={() => {
              onClickUpdateCategoryForm();
            }}
          >
            Update Categories
          </Button>
        </Stack>
      </Card>

      {/* -o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o- */}

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
            <Form.Label htmlFor="newCatId">Product's Category Id</Form.Label>
            <Form.Select
              id="newCatId"
              name="newCatId"
              value={prodCategory || prodSelected.categoryId || ""}
              onChange={(e) => setProdCategory(e.target.value)}
            >
              <option value={""}>Choose a Product Category:</option>
              {category.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
              ;
            </Form.Select>
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
                .then((newProdId) => {
                  hideNewProductForm();
                  return dispatch(fetchProducts()).then(() =>
                    setProdId(newProdId)
                  );
                })
                .then(() => {
                  onClickShowConfirmation();
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
              <Form.Select
                id="prodcatId"
                name="prodcatId"
                value={prodCategory || prodSelected.categoryId || ""}
                onChange={(e) => setProdCategory(e.target.value)}
              >
                <option value={""}>Choose a Product Category:</option>
                {category.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
                ;
              </Form.Select>
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
                  prodId,
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
                  setProdSelected({});
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
            onClick={() => navigate(`../${prodId}`)}
          >
            Go to Product
          </Button>
          <Button variant="secondary" onClick={hideConfirmation}>
            Stay in User's page
          </Button>
        </Modal.Footer>
      </Modal>

      {/* -o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o-o-o-o */}

      <Modal show={showDeleteProductForm} onHide={hideDeleteProductForm}>
        <Modal.Header closeButton>
          <Form.Select
            id="productDelete"
            name="productDelete"
            value={prodSelected.id || ""}
            onChange={(e) => {
              const selectedProduct = product.find(
                (pr) => pr.id.toString() === e.target.value
              );
              handleProductChange(selectedProduct || {});
            }}
          >
            <option value={""}>Choose a Product to Delete:</option>
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
        <Modal.Footer>
          <Button
            type="button"
            variant="warning"
            className="fs-6 fw-bold fst-italic"
            onClick={() => {
              onClickDelete();
              hideDeleteProductForm();
            }}
          >
            Erase {prodName} ?
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={onHideDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm Delete Action</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            type="button"
            variant="warning"
            className="fs-6 fw-bold fst-italic"
            onClick={() => {
              dispatch(deleteProduct(prodId))
                .then(() => {
                  // Once deleteProduct has completed, dispatch fetchProducts
                  return dispatch(fetchProducts());
                })
                .then(() => {
                  // After fetchProducts has completed, hide the delete modal
                  onHideDelete();
                  setProdId("");
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
      </Modal>

      {/* -o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o- */}

      <Modal show={showCategoryForm} onHide={hideCategoryForm}>
        <Modal.Header closeButton>
          <Modal.Title>Categories update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="newCatName">
                Change category's name
              </Form.Label>
              <Form.Select
                id="catName"
                name="catName"
                value={categorySelected || ""}
                onChange={(e) => setCategorySelected(e.target.value)}
              >
                <option value={""}>Select Category to update:</option>
                {category.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
                ;
              </Form.Select>
              <Form.Control
                id="newCatName"
                name="newCatName"
                type="text"
                placeholder="New Name"
                value={categoryNameUpdated}
                onChange={(e) => setCategoryNameUpdated(e.target.value)}
                autoFocus
                autoComplete="off"
              />
              <div className="d-flex justify-content-end">
                <Button
                  className="fs-6 fw-bold fst-italic"
                  variant="warning"
                  onClick={() => {
                    dispatch(
                      modifyCategory(categorySelected, categoryNameUpdated)
                    )
                      .then(() => {
                        return dispatch(fetchCategory());
                      })
                      .then(() => {
                        hideCategoryForm();
                        setCategorySelected("");
                        setCategoryNameUpdated("");
                        setShowSuccess(true);
                      })
                      .catch((error) => {
                        console.error(
                          "failed to modify category's name!!",
                          error
                        );
                      });
                  }}
                >
                  Send Update
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="addCat">add a new Category</Form.Label>
              <Form.Control
                id="addCat"
                name="addCat"
                type="text"
                placeholder="new Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoComplete="off"
              />
            </Form.Group>
            <Modal.Footer>
              <div className="d-flex justify-content-end">
                <Button
                  className="fs-6 fw-bold fst-italic"
                  variant="warning"
                  onClick={() => {
                    dispatch(createCategory(newCategoryName))
                      .then(() => {
                        return dispatch(fetchCategory());
                      })
                      .then(() => {
                        hideCategoryForm();
                        setCategorySelected("");
                        setNewCategoryName("");
                        setShowSuccess(true);
                      })
                      .catch((error) => {
                        console.error(
                          "failed to modify category's name!!",
                          error
                        );
                      });
                  }}
                >
                  Confirm
                </Button>
              </div>
              <Button variant="secondary" onClick={hideCategoryForm}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* -o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o */}

      <Modal show={showSuccess} onHide={hideSuccess}>
        <Modal.Header>
          <Modal.Title>Operation Successful👍</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={hideSuccess}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
