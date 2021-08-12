import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

//import css
import "./style/UserDetail.css"

const path = "http://13.59.148.13:8000";

const ChampionList = ["Kinuta", "Kito", "Arwen", "Iris", "Roku", "JJ", "Katherine", "Horigoshi", "Mary", "Lia"]

const UserDetailInfo = ({userId, userName}) => {

    const [userHistory, setUserHistory] = useState("");
    const [handleUserInfoBox, setHandleUserInfoBox] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(()=> {
        async function getUserHistory() {
            const {data} = await axios.get(`${path}/getUserHistory/${userId}`)
            setUserHistory(data);
        }

        getUserHistory();

    }, [userId])

    const handleOpenUserInfoBox = () => {
        setHandleUserInfoBox(true);
        setOpen(true);
    }

    const handleCloseUserInfoBox = () => {
        setHandleUserInfoBox(false);
        setOpen(false);
    }

    const onUserInfoClick = () => {
        if(open) {
            console.log(userHistory)
            console.log(userName);
            return (
                <div>
                    <h1 className="userdetail-name">{userName}'s Record</h1>
                    <table className="userdetail-table">
                        <tr>
                            <th className="uId">Match Id</th>
                            <th className="uTime">Time Created(Play Time)</th>
                            <th className="uResult">Result</th>
                            <th className="uChampion">Champion</th>
                            <th className="uLevel">Champion Level</th>
                            <th className="uRecord">Record</th>
                            <th className="uKDA">KDA</th>
                            <th className="uGold">Total Gold</th>
                            <th className="uKilledMinion">Killed Minion</th>
                        </tr>
                        {userHistory.map((record)=> {

                            let result = "Defeat";
                            let colorBackground = "#e2b6b3";
                            if(record.team_id === record.team_win_id) {
                                result = "Victory"
                                colorBackground = "#a3cfec"
                            } 

                            const  championName = ChampionList[record.champion_id];

                            return (
                                <tr style={{backgroundColor: colorBackground}}>
                                    <th>{record.match_id}</th>
                                    <th>{record.time_created}({record.play_time} min)</th>
                                    <th>{result}</th>
                                    <th>{championName}</th>
                                    <th>{record.champion_level}</th>
                                    <th>{record.record}</th>
                                    <th>{record.KDA}</th>
                                    <th>{record.total_gold}</th>
                                    <th>{record.minion_killed}</th>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            )
        }
    }

    return (
        <span>
            <span onClick={handleOpenUserInfoBox} style={{fontFamily:"Verdana, sans-serif", fontSize: "13px"}}>&#128269;</span>
            <Modal isOpen={handleUserInfoBox} contentLabel="User Info" onRequestClose={handleCloseUserInfoBox}>
                {onUserInfoClick()}
                <button onClick={handleCloseUserInfoBox}>Back</button>
            </Modal>
        </span>
    )
}

export default UserDetailInfo;
