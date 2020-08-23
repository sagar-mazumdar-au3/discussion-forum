import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

function Comment(props) {
  return (
    <>
      <Card border="light" bg="light">
        <Card.Header className="text-capitalize text-monospace text-info">
            {props.comment.createrName}
            <span className="float-right">
              <Moment format="YYYY/MM/DD HH:mm">{props.comment.createdAt}</Moment>
            </span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {props.comment.comment}
          </Card.Text>
        </Card.Body>
      </Card>
      <hr/>
    </>
  );
}

export default Comment;
