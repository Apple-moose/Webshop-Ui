import "../App.css";
import { React } from "react";
import dateFormat from "dateformat";

export default function ReviewsDisplay(props) {
  return (
    <>
      <div className="productDisplay">
        <p>
          <b>Review: </b>
          {props.content}
        </p>
        <p>
          <b>Stars: </b>
          {props.stars}/5
        </p>
        <p>
          <b>Reviewed by: </b>
          {props.author}
        </p>
        <p>
          <b>Written at: </b>
          {dateFormat(props.createdAt, "dddd, mmmm dS, yyyy")}
        </p>
        <b>Updated at: </b>
        {dateFormat(props.updatedAt, "dddd, mmmm dS, yyyy")}
      </div>
    </>
  );
}
