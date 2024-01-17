import React, { Component } from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css'
import { LoginNavigation } from './Navigation';

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
        fetch("http://172.10.8.246/login-user", {
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
        window.location.href = "./main"
    }
    });
    }

    render() {
        return (
        <>
        <LoginNavigation/>
        <div className='wrapper'>
            <form onSubmit = {this.handleSubmit}>
                <h3>Log In</h3>

                <div className="mb-3">
            <input
                type="id"
                className="form-control"
                placeholder="Enter id"
                onChange = { (e) => this.setState({id: e.target.value })}
            />
            <FaUser className='icon' />
            </div>

            <div className="mb-3">
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange = { (e) => this.setState({password: e.target.value })}
            />
            <FaLock className='icon' />
            </div>

            
            <div className="custom-control-custom-checkbox">

                <label className="custom-control-label" htmlFor="customCheck1">
                <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                />Remember me
                </label>
            </div>
            


            <button type="submit" className="btn-primary">
                Submit
            </button>


            </form>
        </div>
        </>
        )
  }
}

