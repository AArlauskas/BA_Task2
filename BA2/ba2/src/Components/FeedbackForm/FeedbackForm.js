import React, { Component } from "react";
import "./FeedbackForm.css";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import axios from "axios";

class FeedbackForm extends Component {
  state = {
    Name: " ",
    Email: " ",
    Date: moment().format("YYYY-MM-DD"),
    Description: " ",
    WasSent: false
  };
  render() {
    return (
      <div className="form">
        <header>
          <h1>Feedback Form</h1>
        </header>
        <form>
          <div className="Name">
            <TextField
              required
              id="standard-required"
              label="Name"
              style={{ width: 270 }}
              onChange={e => this.setState({ Name: e.target.value })}
              error={this.state.Name === "" ? true : false}
              helperText={
                this.state.Name === "" ? "Name must be enterered" : undefined
              }
              value={this.state.WasSent ? "" : undefined}
            />

            <TextField
              className="Email"
              required
              id="standard-required"
              label="Email"
              style={{ width: 300, marginLeft: 30 }}
              onChange={e => this.setState({ Email: e.target.value })}
              error={this.state.Email === "" ? true : false}
              helperText={
                this.state.Email === "" ? "Email must be enterered" : undefined
              }
              value={this.state.WasSent ? "" : undefined}
            />
          </div>
          <div className="Date">
            <TextField
              id="date"
              label="Date"
              type="date"
              style={{ width: 600 }}
              onChange={e => this.setState({ Date: e.target.value })}
              error={this.state.Date === "" ? true : false}
              helperText={
                this.state.Date === "" ? "Date must be selected" : undefined
              }
              value={moment().format("YYYY-MM-DD")}
            />
          </div>
          <div className="Comment">
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows="6"
              variant="outlined"
              style={{ width: 600 }}
              onChange={e => this.setState({ Description: e.target.value })}
              error={this.state.Description === "" ? true : false}
              helperText={
                this.state.Description === ""
                  ? "Please fill the description"
                  : null
              }
              value={this.state.WasSent ? "" : undefined}
            />
          </div>
          <div className="SubmitButton">
            <Fab variant="extended" onClick={this.handleClick}>
              <NavigationIcon style={{ width: 20 }} />
              Give Feedback!
            </Fab>
          </div>
          <div className="ConfirmText">
            {this.state.WasSent ? <p>Thank you for your feedback</p> : null}
          </div>
        </form>
      </div>
    );
  }
  isValidated = () => {
    if (
      this.state.Name !== " " &&
      this.state.Email !== " " &&
      this.state.Date !== " " &&
      this.state.Description !== " "
    ) {
      return true;
    } else return false;
  };

  handleClick = () => {
    if (this.isValidated()) {
      this.PostFeedback();
    } else {
      alert("Please fill all the fields!");
    }
  };

  PostFeedback = () => {
    axios
      .post("http://localhost:3212/feedbacks", {
        name: this.state.Name,
        email: this.state.Email,
        date: this.state.Date,
        description: this.state.Description
      })
      .then(() => {
        this.setState({ WasSent: true });
      });
  };
}

export default FeedbackForm;
