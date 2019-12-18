import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Entry from "../Entry/Entry";
import Checkbox from "@material-ui/core/Checkbox";

class FindFeedback extends Component {
  state = {
    Feedback: [],
    isChecked: false,
    SearchField: "",
    SelectedDate: moment().format("YYYY-MM-DD"),
    Fetched: false
  };
  render() {
    return (
      <div>
        <form>
          <div className="Name">
            <TextField
              required
              id="standard-required"
              label="Name"
              style={{ width: 350 }}
              defaultValue=""
              onChange={e => this.setState({ SearchField: e.target.value })}
            />

            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={moment().format("YYYY-MM-DD")}
              style={{ width: 200, marginLeft: 15 }}
              disabled={!this.state.isChecked}
              onChange={e => this.setState({ SelectedDate: e.target.value })}
            />
            <Checkbox
              checked={this.state.isChecked}
              onChange={this.handleCheck}
              value="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          <div className="GetButton">
            <Fab variant="extended" size="small" onClick={this.FetchFeedback}>
              <SearchIcon style={{ width: 20 }} />
              Find Feedback
            </Fab>
          </div>
          <div>{this.state.Fetched ? this.ShowFeedback() : null}</div>
        </form>
      </div>
    );
  }
  FetchFeedback = () => {
    axios
      .get("http://localhost:3212/feedbacks")
      .then(resource => {
        let data;
        data = resource.data;
        this.setState({ Feedback: data.body });
      })
      .then(() => this.setState({ Fetched: true }));
  };

  handleCheck = () => {
    this.state.isChecked
      ? this.setState({ isChecked: false })
      : this.setState({ isChecked: true });
  };

  ShowFeedback = () => {
    if (this.state.isChecked === false && this.state.SearchField === "") {
      return (
        <div>
          {this.state.Feedback.map(item => (
            <Entry
              name={item.name}
              email={item.email}
              date={item.date}
              description={item.description}
            />
          ))}
        </div>
      );
    } else if (this.state.isChecked === true && this.state.SearchField === "") {
      return (
        <div>
          {this.state.Feedback.map(item =>
            item.date === this.state.SelectedDate ? (
              <Entry
                name={item.name}
                email={item.email}
                date={undefined}
                description={item.description}
              />
            ) : null
          )}
        </div>
      );
    } else if (
      this.state.isChecked === false &&
      this.state.SearchField !== ""
    ) {
      return (
        <div>
          {this.state.Feedback.map(item =>
            item.name === this.state.SearchField ? (
              <Entry
                name={undefined}
                email={item.email}
                date={item.date}
                description={item.description}
              />
            ) : null
          )}
        </div>
      );
    } else if (this.state.isChecked === true && this.state.SearchField !== "") {
      return (
        <div>
          {this.state.Feedback.map((item, key) =>
            item.name === this.state.SearchField &&
            item.date === this.state.SelectedDate ? (
              <Entry
                key={key}
                name={undefined}
                email={item.email}
                date={undefined}
                description={item.description}
              />
            ) : null
          )}
        </div>
      );
    }
  };
}

export default FindFeedback;
