import React, { useEffect, useState } from 'react';
import axios from "axios";
import {BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";

import "./style/Retention.css"
import Sidebar from './Sidebar';

const path = "http://13.59.148.13:8000";

const Retention = () => {
    const [userData, setUserData] = useState([]);
    const [retentionData, setRetentionData] = useState([]);
    const [retentionfor30DaysData, setRetentionfor30DaysData] = useState([]);

    useEffect(()=> {
        async function getUserList() {
            const {data} = await axios.get(`${path}/getUserListAtLeast1`)
            setUserData(data);
        }
        getUserList();
    }, [])

    useEffect(()=> {
        let resultDataFor7days = [
            { day: "0-Day", count: 0},
            { day: "1-Day", count: 0},
            { day: "3-Day", count: 0}, 
            { day: "7-Day", count: 0}
        ]
        let resultDataFor30Days = [
            { day: "0-Day", count: 0},
            { day: "3-Day", count: 0},
            { day: "7-Day", count: 0},
            { day: "15-Day", count: 0},
            { day: "30-Day", count: 0},
        ]

        function modify() {
            let countSameUserId = 0;
            for(let i=0; i<userData.length; i+=1) {
                let Dday0 = new Date(userData[i].date);
                let Dday1 = new Date(userData[i].date);
                let Dday3 = new Date(userData[i].date);
                let Dday7 = new Date(userData[i].date);
                let Dday15 = new Date(userData[i].date);
                let Dday30= new Date(userData[i].date);
                Dday1.setDate(Dday0.getDate()+1);
                Dday3.setDate(Dday0.getDate()+3);
                Dday7.setDate(Dday0.getDate()+7);
                Dday15.setDate(Dday0.getDate()+15);
                Dday30.setDate(Dday0.getDate()+30);

                for(let j=i; j<userData.length; j++) {
                    if(userData[i].user_id !== userData[j].user_id) {
                        continue;
                    } else {
                        let newDate = new Date(userData[j].date);
                        if(newDate.getTime() === Dday0.getTime()) {
                            resultDataFor7days[0].count +=1;
                        } else if(Dday0.getTime()<newDate.getTime() && Dday1.getTime()>=newDate.getTime()) {
                            resultDataFor7days[1].count +=1;
                        } else if(Dday1.getTime()<newDate.getTime() && Dday3.getTime()>=newDate.getTime()) {
                            resultDataFor7days[2].count +=1;
                        } else if(Dday3.getTime()<newDate.getTime() && Dday7.getTime()>=newDate.getTime()) {
                            resultDataFor7days[3].count +=1;
                        }   

                        if(newDate.getTime() === Dday0.getTime()) {
                            resultDataFor30Days[0].count +=1;
                        } else if(Dday0.getTime()<newDate.getTime() && Dday3.getTime()>=newDate.getTime()) {
                            resultDataFor30Days[1].count +=1;
                        } else if(Dday3.getTime()<newDate.getTime() && Dday7.getTime()>=newDate.getTime()) {
                            resultDataFor30Days[2].count +=1;
                        } else if(Dday7.getTime()<newDate.getTime() && Dday15.getTime()>=newDate.getTime()) {
                            resultDataFor30Days[3].count +=1;
                        } else if(Dday15.getTime()<newDate.getTime() && Dday30.getTime()>=newDate.getTime()) {
                            resultDataFor30Days[4].count +=1;
                        }
                    } 
                    countSameUserId++;
                }
                i+=(countSameUserId-1);
                countSameUserId = 0;
            }
            setRetentionData(resultDataFor7days);
            setRetentionfor30DaysData(resultDataFor30Days);
        }

        modify();

    }, [userData])

    return (
        <>
        <Sidebar/>
        <div className="re-container">
            <h1 className="re-title">Retention Rate</h1>
            <div className="re-7days">
                <BarChart width={600} height={400} data={retentionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{value: "Day", position:"insideBottom", dy:5}} />
                    <YAxis label={{value:"Count", angle: -90, position: "insideLeft", dx:10}}/>
                    <Tooltip/>
                    <Bar dataKey="count" fill="#82ca9d" label={{position:"top"}}/>
                </BarChart>
                <h2 className="graph-title">7 Days Retention</h2>
            </div>
            <div className="re-30days">
                <BarChart width={600} height={400} data={retentionfor30DaysData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{value: "Day", position:"insideBottom", dy:5}} />
                    <YAxis label={{value:"Count", angle: -90, position: "insideLeft", dx:10}}/>
                    <Tooltip/>
                    <Bar dataKey="count" fill="#8884d8" label={{position:"top"}}/>
                </BarChart>
                <h2 className="graph-title">30 Days Retention</h2>
            </div>
        </div>
        </>
    )
}

export default Retention;
