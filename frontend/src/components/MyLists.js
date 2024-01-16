import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default class MyLists extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: "",
        }
    }
    componentDidMount(){
        fetch("http://172.10.8.246/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userData");
            this.setState({userData: data.data})
        })
    }
    render() {
        return (
            <div>
                Name<h1>{this.state.userData.username}</h1>
                ID<h1>{this.state.userData.id}</h1>
            <Link to="/image-search">
                <button className="btn btn-primary">Go to ImageSearch</button>
            </Link>
            </div>
        )
    }
}