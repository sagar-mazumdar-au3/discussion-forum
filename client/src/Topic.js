import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {setTopicDocIndex} from "./redux/actions";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = { x: null };
  }

  HandleSeeMoreButton = () => {
    this.props.setTopicDocIndex(this.props.index);
    localStorage.setItem("topicID",this.props._id);
    localStorage.setItem("createrName",this.props.createrName);
    localStorage.setItem("createdAt",this.props.createdAt);
    localStorage.setItem("topic",this.props.topic);
    localStorage.setItem("description",this.props.description);
  }

  render() {
    return (
      <>
        <Card>
          <Card.Header className="text-capitalize text-monospace text-info">
            {this.props.createrName}
            <span className="float-right">
              <Moment format="YYYY/MM/DD HH:mm">{this.props.createdAt}</Moment>
            </span>
          </Card.Header>
          <Card.Body>
            <Card.Title>{this.props.topic}</Card.Title>
            <Card.Text>{this.props.description}</Card.Text>
            <Link to="/discussion">
            <Button variant="outline-info" size="sm" onClick={()=>{this.HandleSeeMoreButton();}}>
              See More
            </Button>
            </Link>
          </Card.Body>
        </Card>
        <hr/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
} 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setTopicDocIndex},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps) (Topic);
