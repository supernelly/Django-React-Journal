import React, { Component } from "react";
import Modal from '../Journal/modal';
import axios from "axios";


class Journal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entryList: [],
      modal: false,
      activeItem: {
        title: "",
        body: "",
        username: sessionStorage.getItem('username'),
      },
    };
  }
  
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    var token = sessionStorage.getItem('token');
    axios
      .get(`https://afternoon-hamlet-77607.herokuapp.com/api/entries/`, {
        headers: {
          Authorization: 'Token ' + token,
          Username: sessionStorage.getItem('username')
        }
       })
      .then((res) => this.setState({ entryList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    var token = sessionStorage.getItem('token');
    // Create and update, depending on if id exists or not
    axios
      .post("https://afternoon-hamlet-77607.herokuapp.com/api/entries/", item, {
        headers: {
          Authorization: 'Token ' + token
        }
       })
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    var token = sessionStorage.getItem('token');
      axios
      .delete(`https://afternoon-hamlet-77607.herokuapp.com/api/entries/${item.id}/`, {
        headers: {
          Authorization: 'Token ' + token
        }
       })
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", body: "" , username: sessionStorage.getItem('username')};

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const newItems = this.state.entryList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between flex-column"
      >
        <span className={`mr-2 font-weight-bold`}>
          {item.title}
        </span>
        <span className={`mr-2 mb-2`}>
          {item.body}
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

  logOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    window.location.href = '/';
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
        <div className="text-center my-4">
          <button
            className="btn btn-primary"
            onClick={this.logOut}
          >
            Log out
          </button>
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