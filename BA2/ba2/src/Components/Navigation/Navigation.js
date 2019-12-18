import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./Navigation.css";

class Navigation extends Component {
  state = {
    SelectedTab: "Feedback Form"
  };
  render() {
    return (
      <div>
        <Paper className="Top" square>
          <Tabs
            value={this.state.SelectedTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              label="Feedback Form"
              onClick={() => this.props.navigate(true)}
              value={"Feedback Form"}
            />
            <Tab
              value={"Find feedback"}
              label="Find feedback"
              onClick={() => this.props.navigate(false)}
            />
          </Tabs>
        </Paper>
      </div>
    );
  }
  handleTabChange = (event, value) => {
    this.setState({ SelectedTab: value });
  };
}

export default Navigation;
