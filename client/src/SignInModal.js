import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {login} from "./redux/actions";

function SignInModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => { setAlert(false); setShow(true)};

  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const handleChange = (e) => {
    switch (e.target.name) {
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

    if (password.length < 6) {
        setAlert(true);
        setAlertMessage("Incorrect Email  or Password");
        return;
    }

    setAlert(false);

    // user OBJ
    const user = {
      email,
      password
    };
    
    const reqRes = await props.login(user);
    if(reqRes.type === "SUCCESS-SIGNIN"){
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
        Sign-In
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign-In</Modal.Title>
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
              you have loged in successfully
              </div>
            )}
            {/* Form */}
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
                value={email}
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
              SignIn
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {email:state.email};
} 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({login},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (SignInModal);

