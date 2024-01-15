import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const { id, password } = this.state;
        console.log( id, password);
        fetch("http://localhost:80/login-user", {
        method: "POST",
        crossDomain: true,
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Accesss-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
            id,
            password,
        }),
    }).then((res) => res.json())
    .then((data) => {
        console.log(data, "userRegister");
    if(data.status == "ok") {
        alert("login successful");
        window.localStorage.setItem("token", data.data);
        window.location.href = "./my-lists"
    }
    });
    }

    render() {
        return (
        <form onSubmit = {this.handleSubmit}>
            <h3>Log In</h3>

            <div className="mb-3">
            <label>ID</label>
            <input
                type="id"
                className="form-control"
                placeholder="Enter id"
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

            <div className="mb-3">
            <div className="custom-control custom-checkbox">
                <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
                </label>
            </div>
            </div>

            <div className="d-grid">
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
            <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
            </p>
        </form>
        )
  }
}