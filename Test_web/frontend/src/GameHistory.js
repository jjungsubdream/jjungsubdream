import React from 'react';
import axios from "axios";
import GameModal from "./GameModal";
import GameGraph from "./GameGraph";
import DatePicker from "react-datepicker";

//import css
import "./style/DashBoard.css"
import "./style/Table.css"
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from './Sidebar';

const path = "http://13.59.148.13:8000";

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      totalRecord: [],
      sortedRecord: [],
      isSorted: false,
      startDate: new Date(),
      endDate: new Date(),
      reload: false,
    }
    this.sortTable = this.sortTable.bind(this);
  }

  componentDidMount() {
    this.getTotalPlayedGames();
    console.log(this.state.reload);
    this.setState({
      reload: true
    })
    console.log(this.state.reload);
  }

  async getTotalPlayedGames () {
    const {data} = await axios.get(`${path}/totalPlayedGame`);
    this.setState({
      totalRecord: data
    });
  }

  sortTable() {
    const {startDate, endDate, totalRecord} = this.state;
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

    let resultRecord = [];
    totalRecord.forEach((record) => {
      let tempRecordDate = new Date(record.date);
      if(tempRecordDate >= newStartDate && tempRecordDate <= newEndDate) {
        resultRecord.push(record);
      }
    })

    this.setState({
      sortedRecord: resultRecord,
      isSorted: true
    })
  }

  render() {
    const {totalRecord, startDate, endDate, isSorted, sortedRecord} = this.state;
    return (
      <>
      <Sidebar/>
      <div>
        <div className="games-wrapper">
          <h1 className="games-title">Played games record per day (UTC time zone)</h1> 
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
          <div className="infoBox">
            <span>&#9989; 5v5 Real Players</span>
            <span>&#128065; Spectator</span>
          </div>
          <div className="games-main"> 
            <table className="gameTable">
              <tr>
                <th className="date">Date</th>
                <th className="number">Finished(Unfinished)</th>
                <th className="info">Detail</th>
              </tr>
              {isSorted ? sortedRecord.map(game => (
                <tr>
                  <th>{game.date}</th>
                  <th>{game.NumPlayedGame}({game.NumUnfinishedGame}) games</th>
                  <th><GameModal result={game.date}/></th>
                </tr>
              )) : 
              totalRecord.map(game => (
                <tr>
                  <th>{game.date}</th>
                  <th>{game.NumPlayedGame}({game.NumUnfinishedGame}) games</th>
                  <th><GameModal result={game.date}/></th>
                </tr>
              ))
              }
            </table>
          </div>
        </div>
        <div className="gameGraph">
          {isSorted ? (
            <GameGraph gameDate={sortedRecord}></GameGraph>
          ):(
            <GameGraph gameDate={totalRecord}></GameGraph>  
          )}
        </div>
      </div>
      </>
    )
  }
}

export default DashBoard;

