import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {signup} from "./redux/actions";

function SignUpModal(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => { setAlert(false); setShow(true)};

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name": {
        setName(e.target.value);
        break;
      }
      case "email": {
        setEmail(e.target.value);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setAlert(true);
      setAlertMessage("Name must be at least 3 characters long");
      return;
    } else if (password.length < 6) {
        setAlert(true);
        setAlertMessage("Password must be at least 6 characters long");
        return;
    }

    setAlert(false);

    // user OBJ
    const user = {
      email,
      name,
      password,
    };
    const reqRes = await props.signup(user);
    if(reqRes.type === "SUCCESS-SIGNUP"){
      setAlertMessage("successful");
      setTimeout(() => {setAlertMessage();handleClose();}, 2000); 
    } else {
      setAlert(true);
      setAlertMessage(reqRes.payload.message);
    }
  };

  return (
    <>
      <span className="btn text-info" onClick={handleShow}>
        Sign-Up
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign-Up</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            {/* Alert */}
            { alert && (
              <div className="alert alert-warning" role="alert">
              {alertMessage}!
              </div>
            )}
            { alertMessage === "successful" && (
              <div className="alert alert-success" role="alert">
              you have signed up successfully
              </div>
            )}
            {/* Form */}
            <div className="form-group">
              <label htmlFor="inputName">Name*</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="inputName"
                aria-describedby="nameHelp"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">Email*</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="inputEmail"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password*</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="inputPassword"
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
              SignUp
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
} 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signup},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (SignUpModal);
