
import React, { Component } from 'react'

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            id: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit(e) {
    e.preventDefault();
    const { username, id, password } = this.state;
    console.log(username, id, password);
    fetch("http://172.10.8.246/register", {
        method: "POST",
        crossDomain: true,
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Accesss-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
            username,
            id,
            password,
        }),
    }).then((res) => res.json())
    .then((data) => {
        console.log(data, "userRegister")
    });
}

  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange = { (e) => this.setState({username: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>ID</label>
          <input
            type="id"
            className="form-control"
            placeholder="Enter ID"
            onChange = { (e) => this.setState({id: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange = { (e) => this.setState({password: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}