import React, { useState } from 'react';
import axios from "axios";

//import css
import "./style/SearchUser.css"
import "./style/Modal.css"

const path = "http://13.59.148.13:8000";

const SearchUser = () => {

    const [playerID, setPlayerID] = useState("");
    const [playerRecord, setPlayerRecord] = useState([]);
    const [hasSomething, setHasSomething] = useState(-1);

    const onChange = (event) => {
        const {target: {value}} = event;
        setPlayerID(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        async function getUserInfo() {
            const {data} = await axios.get(`${path}/searchUser/${playerID}`)
            setPlayerRecord(data);
            if(data.length !== 0) {
                setHasSomething(1);
            } else {
                setHasSomething(0);
            }
        }
        getUserInfo();
    }

    const showRecord = () => {
        if(hasSomething === 1) {
            return (
                <div className="tableContainer">
                    <table className="resultTable">
                        <tr>
                            <th className="sId">Match ID</th>
                            <th className="sResult">Result</th>
                            <th className="sTime">Time Created</th>
                            <th className="sPlay">Play Time</th>
                        </tr>
                        {playerRecord.map((record)=> {

                            let colorBackground = "#e2b6b3";
                            if(record.team_id === record.team_win_id) {
                                colorBackground = "#a3cfec"
                            } 
                            return (
                                <tr style={{backgroundColor: colorBackground}}>
                                    <th>{record.match_id}</th>
                                    <th>{record.result}</th>
                                    <th>{record.time_created}</th>
                                    <th>{record.play_time} min</th>
                                </tr>
                                
                            )
                            })}
                    </table>
                </div>
            )
        } else if(hasSomething === 0) {
            return (
                <div style={{padding: 20}}>
                    Your search - {playerID} - did not match any data.
                </div>
            )
        } else if(hasSomething === -1) {
            return (
                <div style={{padding: 20}}>
                    Please Input Player Name
                </div>
            )
        }
    }

    return (
        <>
            <div className="searchContainter">    
                <form onSubmit={onSubmit} className="searchForm">
                    <input value={playerID} type="text" onChange={onChange} placeholder="Input Player Name"/>
                    <input type="submit" value="Search"/>
                </form>
            </div>
            <div className="resultContainer">
                {showRecord()}
            </div>
        </>
    )
}

export default SearchUser;