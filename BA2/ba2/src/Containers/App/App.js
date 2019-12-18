import React, { Component } from "react";
import "./App.css";
import FeedbackForm from "../../Components/FeedbackForm/FeedbackForm";
import Navigation from "../../Components/Navigation/Navigation";
import FindFeedback from "../../Components/FindFeedback/FindFeedback";

class App extends Component {
  state = {
    isFormShowing: true
  };
  render() {
    return (
      <div>
        <div className="Navigation">
          <Navigation navigate={this.navigate} />
        </div>
        <div className="Content">
          {this.state.isFormShowing ? <FeedbackForm /> : <FindFeedback />}
        </div>
      </div>
    );
  }
  navigate = param => {
    this.setState({ isFormShowing: param });
  };
}

export default App;
