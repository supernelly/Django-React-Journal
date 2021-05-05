import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Modal from '../Journal/modal';
import axios from "axios";

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      entryList: [],
      modal: false,
      activeItem: {
        title: "",
        body: "",
      },
    };
  }
  
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`/api/entries/`)
      .then((res) => this.setState({ entryList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    // Create and update, depending on if id exists or not
    if (item.id) {
      axios
      .put(`/api/entries/${item.id}/`, item)
      .then((res) => this.refreshList());
    return;
    }
    axios
      .post("/api/entries/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
      axios
      .delete(`/api/entries/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", body: "" };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.entryList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`journal-title mr-2`}
          title={item.body}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Journal</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  New Entry
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default Journal;