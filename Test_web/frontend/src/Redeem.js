import React, { useEffect, useState } from "react"
import axios from "axios";

import Sidebar from './Sidebar';
import "./style/Redeem.css";

const path = "http://13.59.148.13:8000";

const Redeem = () => {
    
    const[useRedeemCode, setRedeemCode] = useState([]);
    const[useRedeemCodeByGroup, setRedeemCodeByGroup] = useState([]);

    useEffect(() => {
        async function getRedeemCode() {
            const {data} = await axios.get(`${path}/getGiftCode`)
            setRedeemCode(data);
        }

        async function getRedeemCodeByGroup() {
            const {data} = await axios.get(`${path}/getGiftCodeByDescription`)
            setRedeemCodeByGroup(data);
        }

        getRedeemCode();
        getRedeemCodeByGroup();

    }, []) 

    return (
        <>
            <Sidebar/>
            <div className="redeem-container">
                <div className="redeem-box">
                    <h1 className="redeem-title">Redeem Code Info</h1>
                    <div className="redeem-table-wrapper">
                        <table className="redeem-table">
                            <tr>
                                <th className="code_string">Code String</th>
                                <th className="description">Description</th>
                                <th className="time_used">Time Used</th>
                                <th className="max_time_use">Max Time Use</th>
                            </tr>
                            {useRedeemCode.map( redeem => (
                                <tr>
                                    <th>{redeem.code_string}</th>
                                    <th>{redeem.description}</th>
                                    <th>{redeem.time_used}</th>
                                    <th>{redeem.max_time_use}</th>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
                <div className="redeem-boxForGroup">
                    <h1 className="redeem-title">Redeem Code Info By Group</h1>
                    <div className="redeem-table-wrapper">
                        <table className="redeem-table">
                            <tr>
                                <th className="description2">Description</th>
                                <th className="totalTimeUsed">Total Time Used</th>
                                <th className="totalMaxTimeUse">Total Max Time Use</th>
                            </tr>
                            {useRedeemCodeByGroup.map(redeem => (
                                <tr>
                                    <th>{redeem.description}</th>
                                    <th>{redeem.totalTimeUsed}</th>
                                    <th>{redeem.totalMaxTimeUse}</th>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Redeem;