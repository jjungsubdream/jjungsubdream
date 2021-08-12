import React from 'react';
import axios from "axios";
import PlayerModal from "./PlayerModal";
import PlayerGraph from "./PlayerGraph";
import SearchUser from './SearchUser';
import DatePicker from "react-datepicker";

//import css
import "./style/DashBoard.css"
import "./style/Table.css"
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from './Sidebar';

const path = "http://13.59.148.13:8000";
//const path = "http://localhost:8000";

class PlayerHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          playerRecord: [],
          sortedRecord: [],
          isSorted: false,
          startDate: new Date(),
          endDate: new Date(),
          reload: false,
        }
        this.sortTable = this.sortTable.bind(this);
    }
    
    componentDidMount() {
        this.getPlayedPlayer();
    }

    async getPlayedPlayer() {
        const {data} = await axios.get(`${path}/playedPlayers`);
        this.setState({
          playerRecord: data
        });
    }

    sortTable() {
        const {startDate, endDate, playerRecord} = this.state;
        const startDateForm = startDate;
        const endDateForm = endDate;
    
        const startYear = String(startDateForm).substring(11, 15);
        let startMonth = String(startDateForm).substring(4,7);
        const startDay = String(startDateForm).substring(8,10);
    
        const endYear = String(endDateForm).substring(11, 15);
        let endMonth = String(endDateForm).substring(4,7);
        const endDay = String(endDateForm).substring(8,10);
    
        switch(startMonth) {
          case "Jan" :
            startMonth = "01";
            break;
          case "Feb" :
            startMonth = "02";
            break;
          case "Mar" :
            startMonth = "03";
            break;
          case "Apr" :
            startMonth = "04";
            break;
          case "May" :
            startMonth = "05";
            break;
          case "Jun" :
            startMonth = "06";
            break;
          case "Jul" :
            startMonth = "07";
            break;
          case "Aug" :
            startMonth = "08";
            break;
          case "Sep" :
            startMonth = "09";
            break;
          case "Oct" :
            startMonth = "10";
            break;
          case "Nov" :
            startMonth = "11";
            break;
          case "Dec" :
            startMonth = "12";
            break;
          default :
            break;
        }
    
        switch(endMonth) {
          case "Jan" :
            endMonth = "01";
            break;
          case "Feb" :
            endMonth = "02";
            break;
          case "Mar" :
            endMonth = "03";
            break;
          case "Apr" :
            endMonth = "04";
            break;
          case "May" :
            endMonth = "05";
            break;
          case "Jun" :
            endMonth = "06";
            break;
          case "Jul" :
            endMonth = "07";
            break;
          case "Aug" :
            endMonth = "08";
            break;
          case "Sep" :
            endMonth = "09";
            break;
          case "Oct" :
            endMonth = "10";
            break;
          case "Nov" :
            endMonth = "11";
            break;
          case "Dec" :
            endMonth = "12";
            break;
          default :
            break;
        }
    
        const rightStartDate = `${startYear}-${startMonth}-${startDay}`;
        const rightEndDate = `${endYear}-${endMonth}-${endDay}`;
    
        const newStartDate = new Date(rightStartDate);
        const newEndDate = new Date(rightEndDate);
    
        let tempRecord = [];
        playerRecord.forEach((record) => {
          let tempRecordDate = new Date(record.date);
          if(tempRecordDate >= newStartDate && tempRecordDate <= newEndDate) {
            tempRecord.push(record);
          }
        })
    
        this.setState({
          sortedRecord: tempRecord,
          isSorted: true
        })
    
      }

    render() {
        const {playerRecord, startDate, endDate, isSorted, sortedRecord, reload} = this.state;
        if(!reload) {
          this.setState({
            reload: true
          })
        }
        return (
          <>
            <Sidebar/>
            <div>
                <div className="players-wrapper">
                    <h1 className="players-title">Played players record per day (UTC time zone)</h1>
                    <div className="calendar-main">
                        Date range: 
                        <DatePicker
                            selected={startDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                this.setState({
                                startDate: start,
                                endDate: end
                                })
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            />
                    </div>
                    <div className="calendar-button">
                        <button onClick={this.sortTable}>Search</button>
                    </div>                    
                    <div className="players-main">  
                        <table className="playerTable">
                            <tr>
                                <th className="date">Date</th>
                                <th className="number">Num of Player(Duplication)</th>
                                <th className="info">Detail</th>
                            </tr>
                            {isSorted ? sortedRecord.map(player => (
                                <tr>
                                    <th>{player.date}</th>
                                    <th>{player.NumPlayedPlayer}</th>
                                    <th><PlayerModal date={player.date}/></th>
                                    {console.log("check history", player)}
                                </tr>
                            )) :
                            playerRecord.map(player=> (
                                <tr>
                                    <th>{player.date}</th>
                                    <th>{player.NumPlayedPlayer}({player.NumTotalPlayedPlayer}) players</th>
                                    <th><PlayerModal date={player.date}/></th>
                                </tr>
                            ))
                            }
                        </table>
                    </div>
                </div>
                <div className="playerGraph">
                    {isSorted ? (
                        <PlayerGraph playerDate={sortedRecord}></PlayerGraph>
                    ) : (
                        <PlayerGraph playerDate={playerRecord}></PlayerGraph>
                    )}
                </div>
                <div className="containterSearchBox">
                  <SearchUser/>
                </div>                
            </div>
          </>
        )
    }
}

export default PlayerHistory;