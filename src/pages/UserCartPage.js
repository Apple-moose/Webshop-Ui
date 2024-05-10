import "../App.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchFullProduct } from "../store/productFullPage/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectFullProduct } from "../store/productFullPage/selectors";
import { selectUser } from "../store/user/selectors";

export default function UserCartPage() {
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


    
      <div className="productFullTitle">
      <IoIosAddCircleOutline />
      </div>

    </>
  );
}
