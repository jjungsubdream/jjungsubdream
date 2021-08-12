import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";

// import {MdDashboard} from "react-icons/md"
import {MdGames} from "react-icons/md"
import {MdPerson} from "react-icons/md"
import {IoTrophy} from "react-icons/io5"
import {RiSwordLine} from "react-icons/ri";
import {VscGraph} from "react-icons/vsc";
import {VscGift} from "react-icons/vsc";

//import css
import "./style/Sidebar.css";

//import image
import logo from "./image/logo.png"

const path = "http://13.59.148.13:8000";

const Sidebar = (props) => {
    const [games, setGames] = useState();
    const [players, setPlayers] = useState();

    const cookie = new Cookies();

    useEffect(()=> {
        async function getTotalPlayedGames() {
            const {data} = await axios.get(`${path}/getTotalPlayedGames`);
            setGames(data[0].TotalPlayedGame)
        }
        async function getTotlaPlayedPlayers() {
            const {data} = await axios.get(`${path}/getTotalPlayedPlayers`);
            setPlayers(data[0].TotalCumulativePlayedPlayer)
        }
        getTotalPlayedGames();
        getTotlaPlayedPlayers();
    },[]);

    const onClick = () => {
        cookie.remove('user', {path: '/'})
    }

    return(
        <div className="sidebar">
            <div className="sidebar-main">
                <img src={logo} alt="logo of isekai Eternal" className="sidebar-logoImage"/>
                <Link to="/gamerHistory" style={{color: "whitesmoke", textDecoration: "none"}}>
                    Admin Page
                </Link>
            </div>
            <div className="logout">
                <Link to="/" className="logout-button">
                    <div>
                        <button onClick={onClick}>
                            Logout
                        </button>
                    </div>
                </Link>
            </div>
            <div className="sidebar-minor">
                <MdGames className="sidebar-icon"/>
                <Link to="/gamerHistory" className="sidebar-content">
                    Games History
                </Link>
            </div>
            <div className="sidebar-minor">
                <MdPerson className="sidebar-icon"/>
                <Link to="/playerHistory" className="sidebar-content">
                    Players History
                </Link>
            </div>
            <div className="sidebar-minor">
                <IoTrophy className="sidebar-icon"/>
                <Link to="/leaderboard" className="sidebar-content">
                    Leaderboard
                </Link>
            </div>
            <div className="sidebar-minor">
                <Link to="/champions" className="sidebar-content">
                <RiSwordLine className="sidebar-icon"/>
                    Champions
                </Link>
            </div>
            <div className="sidebar-minor">
                <Link to="/retention" className="sidebar-content">
                    <VscGraph className="sidebar-icon"/>
                    Retention
                </Link>
            </div>
            <div className="sidebar-minor">
                <Link to="/redeemCode" className="sidebar-content">
                    <VscGift className="sidebar-icon"/>
                    Redeem Code
                </Link>
            </div>
            <div style={{position: "absolute", bottom: 0, width: "200px"}}>
                <br/>
                <div className="sidebar-games">
                    <p>Total Played Games</p>
                    <p style={{textAlign: "center", fontSize: "12pt"}}>{games}</p>
                </div>
                <div className="sidebar-players">
                    <p>Total Played Players</p>
                    <p style={{textAlign: "center", fontSize: "12pt"}}>{players}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
