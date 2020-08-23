import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {createTopic} from "./redux/actions";

import { Button, Modal } from "react-bootstrap";

function NewTopicModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [topic, setTopic] = useState();
  const [description, setDescription] = useState();
  
  const [alertMessage, setAlertMessage] = useState();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "topic": {
        setTopic(e.target.value);
        break;
      }
      case "description": {
        setDescription(e.target.value);
        break;
      }
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // user OBJ
    const topicObj = {
      topic,
      description,
      createrName: props.name,
      createrID: props.email
    };
    const reqRes = await props.createTopic(topicObj);
    if(reqRes.type === "TOPICS"){
      setAlertMessage("successful");
      setTimeout(() => {setAlertMessage();handleClose();}, 2000); 
    }
  };

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        +New Topic
      </Button>

      {props.isLoggedIn && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Topic for Discussion.</Modal.Title>
          </Modal.Header>
          {}
          <form onSubmit={(e) => handleSubmit(e)}>
            <Modal.Body>
              {/* Alert */}
              { alertMessage === "successful" && (
              <div className="alert alert-success" role="alert">
              Topic Created successfully
              </div>
              )}
              {/* Form */}
              <div className="form-group">
                <label htmlFor="inputTopic">Topic</label>
                <input
                  type="text"
                  className="form-control"
                  name="topic"
                  id="inputTopic"
                  aria-describedby="topicHelp"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputDescription">Description</label>
                <textarea
                  rows="3"
                  className="form-control"
                  name="description"
                  id="inputDescription"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                />
              </div>
              {/*  */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="success" size="sm">
                Create
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      )}
      {/* Alert Modal */}
      {!props.isLoggedIn && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            Please <strong>Sign-In</strong> First to Create Topic for
            Discussion.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" size="sm" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn, name: state.name, email: state.email };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createTopic}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(NewTopicModal);
