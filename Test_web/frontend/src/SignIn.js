import React, { useState } from "react"
import axios from "axios";
import Cookies from 'universal-cookie';
import {useHistory} from "react-router-dom";

import logo from "./image/logo2.png"
import "./style/SignIn.css"

const path = "http://13.59.148.13:8000";

const SignIn = () => {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [reload, setReload] = useState(false);
    const cookies = new Cookies();

    const history = useHistory();

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "userId") {
            setUserId(value);
        } else if(name === "userPw") {
            setUserPw(value);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const json = { id : userId, password : userPw};

        axios.post(`${path}/login`, json, { withCredentials: true })
            .then(res => {
                if(res.data.result) {
                    cookies.set('user', userId, {path: '/'});
                    history.push("/gamerHistory");
                    setReload(!reload);
                    window.location.reload();
                } else {
                    alert("Wrong Password");
                }
            }) 
    }

    return (
        <div className="signIn-Container">
            <img src={logo} alt="logo of isekai Eternal" className="logoImage"/>
            <h1 className="MainTitle">Admin Website</h1>
            <form onSubmit={onSubmit} className="auth-container">
                <input className="authInput" name="userId" placeholder="id" required value={userId} onChange={onChange}/>
                <input className="authInput" name="userPw" type="password" placeholder="password" required value={userPw} onChange={onChange}/>
                <input className="authInput authSubmit" type="submit"/>
            </form>
        </div>
    )
}

export default SignIn;