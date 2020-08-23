import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAlltopics } from "./redux/actions";
import Topic from "./Topic";
import { Badge } from "react-bootstrap";

class DiscussionList extends Component {
  constructor(props) {
    super(props);
    this.state = { x: null };
  }

  componentDidMount = () => {
    this.props.getAlltopics();
  };

  render() {
    return (
      <>
        <div className="text-center ">
          <Badge pill variant="light" className="p-2 text-monospace">
            Discussion List
          </Badge>
        </div>
        <hr />
        {this.props.topics.map((topic, index) => {
          return (
              <Topic
                key={index}
                index = {index}
                createrName={topic.createrName}
                topic={topic.topic}
                description={topic.description}
                createdAt={topic.createdAt}
                _id={topic._id}
              />
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { topics: state.topics };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAlltopics }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(DiscussionList);
