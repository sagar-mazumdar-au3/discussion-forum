import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {logOut} from "./redux/actions";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import NewTopicModal from "./NewTopicModal";

function Nav(props) {
  return (
    <nav>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to="/" className="text-white text-decoration-none">Discussion Forum</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {props.isLoggedIn ? <span> Signed-in as : {props.name} </span>  : <SignInModal/>}
            <SignUpModal/>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <Navbar className="">
      <NewTopicModal/>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {props.isLoggedIn && <Button variant="danger" size="sm" onClick={()=>props.logOut()}>
                LogOut
            </Button>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {isLoggedIn : state.isLoggedIn,name:state.name};
} 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logOut},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Nav);
