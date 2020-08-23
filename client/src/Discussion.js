import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTopicComments, createComment } from "./redux/actions";
import { Card, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Comment from "./Comment";

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  componentDidMount = () => {
    if (Object.entries(this.props.topic).length === 0)
      this.props.getTopicComments(localStorage.getItem("topicID"));
    else this.props.getTopicComments(this.props.topic._id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const topicID = this.props.topic._id || localStorage.getItem("topicID");
    const newComment = { comment: this.state.comment, topicID };
    this.props.createComment(newComment);
    this.setState({ comment: "" });
  };

  render() {
    return (
      <>
        <div className="text-center ">
          <Badge pill variant="light" className="p-2 text-monospace">
            Discussion
          </Badge>
        </div>

        <hr className="mb-0 pb-0"/>
        <Link to="/">
          <svg
            width="2em"
            height="3em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-left"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
            />
            <path
              fillRule="evenodd"
              d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </Link>

        <Card border="info">
          <Card.Header className="text-capitalize text-monospace text-info">
            {this.props.topic.createrName ||
              localStorage.getItem("createrName")}
            <span className="float-right">
              <Moment format="YYYY/MM/DD HH:mm">
                {this.props.topic.createdAt ||
                  localStorage.getItem("createdAt")}
              </Moment>
            </span>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {this.props.topic.topic || localStorage.getItem("topic")}
            </Card.Title>
            <Card.Text>
              {this.props.topic.description ||
                localStorage.getItem("description")}
            </Card.Text>
          </Card.Body>
        </Card>

        <hr />

        <div name="comment-textarea">
          <Form
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                value={this.state.comment}
                onChange={(e) => {
                  this.setState({ comment: e.target.value });
                }}
                as="textarea"
                rows="2"
                placeholder="Add a public comment..."
                required
              />
              <div className="text-right mt-2">
                <span className="float-left text-muted">
                  {" "}
                  {this.props.isLoggedIn
                    ? null
                    : "To post a comment you need to login first!"}
                </span>
                <button
                  type="submit"
                  className="btn btn-secondary btn-sm "
                  disabled={this.props.isLoggedIn ? false : true}
                >
                  Submit
                </button>
              </div>
            </Form.Group>
          </Form>
        </div>

        <hr />

        <div name="public-comments">
          {this.props.comments.map((comment, index) => {
            return <Comment comment={comment} key={index} />;
          })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    topic: state.topic,
    comments: state.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getTopicComments, createComment }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
