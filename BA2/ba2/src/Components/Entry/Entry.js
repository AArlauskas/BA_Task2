import React, { Component } from "react";
import "./Entry.css";

class Entry extends Component {
  state = {};
  render() {
    return (
      <div>
        <ul className="List">
          {this.props.name !== undefined ? (
            <li key={this.props.key}>Name: {this.props.name}</li>
          ) : null}
          <li key={this.props.key}>Email: {this.props.email}</li>
          {this.props.date !== undefined ? (
            <li key={this.props.key}>Date: {this.props.date}</li>
          ) : null}
          <li key={this.props.key}>Description: {this.props.description}</li>
          <hr />
        </ul>
      </div>
    );
  }
}

export default Entry;
