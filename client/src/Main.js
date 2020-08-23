import React, { Component } from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {getUserFromlocalStorage} from "./redux/actions";
import DiscussionList from "./DiscussionList";
import Discussion from "./Discussion";


class Main extends Component {

componentDidMount = () => {
  this.props.getUserFromlocalStorage();
}
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/">
                <DiscussionList/>
              </Route>
              <Route exact path="/discussion">
                <Discussion/>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
} 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUserFromlocalStorage},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Main);
