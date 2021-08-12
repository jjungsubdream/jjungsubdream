import React from 'react';
import axios from "axios";
import UserDetailInfo from './UserDetailInfo';

//import css
import "./style/RankingBoard.css";
import Sidebar from './Sidebar';

const path = "http://13.59.148.13:8000";

class RankingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rankList: [],
            isDescendingByPoints: true,
            isDescendingByNumGames: true,
            totalPlayedPlayers: 0,
            totalPage: 0,
            page: 1,
            reload: false,

        }
        this.sortByPoints = this.sortByPoints.bind(this);
        this.sortByNumGames = this.sortByNumGames.bind(this);
        this.rankColor = this.rankColor.bind(this);
        this.showingTable = this.showingTable.bind(this);
    }

    componentDidMount() {
        this.getTotalPlayedPlayer();
        this.getRank();
        this.rankColor();
    }

    async getTotalPlayedPlayer () {
        const {data} = await axios.get(`${path}/getTotalPlayedPlayers`);
        this.setState({
            totalPlayedPlayers: data[0].TotalCumulativePlayedPlayer,
        }, () => {
            this.calculatePageNumber()
        })       
    }

    async getRank () {
        const {data} = await axios.get(`${path}/getRank/${this.state.page}`);
        this.setState({
            rankList: data[0],
        })
    }

    sortByPoints() {
        const {rankList} = this.state;
        let tempRank = rankList.slice();
        if(!this.state.isDescendingByPoints) {
            tempRank = rankList.sort((a,b)=>{
                if(a.current_points > b.current_points) {
                    return -1;
                }
                if(a.current_points < b.current_points) {
                    return 1;
                }
                return 0;
            })
        } else if(this.state.isDescendingByPoints) {
            tempRank = rankList.sort((a,b)=>{
                if(a.current_points < b.current_points) {
                    return -1;
                }
                if(a.current_points > b.current_points) {
                    return 1;
                }
                return 0;
            })
        }            
        this.setState({
            isDescendingByPoints: !this.state.isDescendingByPoints,
            rankList: tempRank
        })
    }

    sortByNumGames() {
        const {rankList} = this.state;
        let tempRank = rankList.slice();
        if(!this.state.isDescendingByNumGames) {
            tempRank = rankList.sort((a,b)=>{
                if(a.TotalNumGame > b.TotalNumGame) {
                    return -1;
                }
                if(a.TotalNumGame < b.TotalNumGame) {
                    return 1;
                }
                return 0;
            })
        } else if(this.state.isDescendingByPoints) {
            tempRank = rankList.sort((a,b)=>{
                if(a.TotalNumGame < b.TotalNumGame) {
                    return -1;
                }
                if(a.TotalNumGame > b.TotalNumGame) {
                    return 1;
                }
                return 0;
            })
        }            
        this.setState({
            isDescendingByNumGames: !this.state.isDescendingByNumGames,
            rankList: tempRank
        })
    }

    rankColor(playerScore) {
        let color = "";
        if(playerScore>=500) {
            color="Black"
        } else if(playerScore>=400) {
            color="Red/Black"
        } else if(playerScore>=300) {
            color="Red"
        } else if(playerScore>=200) {
            color="Blue"
        } else if(playerScore>=100) {
            color="Yellow"
        } else {
            color="White"
        }

        if(color === "Red/Black") {
            return (
                <div>
                    <div style={{display: "inline-block", width: 7.5, height: 15, border: "1px solid black",  background: "Red"}}></div>
                    <div style={{display: "inline-block", width: 7.5, height: 15, border: "1px solid black",  background: "Black"}}></div>
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{width: 15, height: 15, border: "1px solid black",  background: color}}></div>
                </div>
            )
        }
    }

    calculatePageNumber() {
        const totalPage = Math.round(this.state.totalPlayedPlayers/100) + 1;
        this.setState({
            totalPage
        })
    }

    showPagination() {

    }

    showingTable() {
        const {rankList} = this.state;
        let rank = 0;

        return (
            <>
            <div className="rankTable-wrapper">
                    <table className="rankTable-main">
                        <tr>
                            <th className="rank">Rank</th>
                            <th className="userId">User_id</th>
                            <th className="characterName">Name</th>
                            <th className="rankcolor">Rank</th>
                            <th className="currentPoints">
                                Points 
                                &nbsp; 
                                <span onClick={this.sortByPoints}>&#8645;</span>
                            </th>
                            <th className="TotalNumGame">
                                TotalGame 
                                &nbsp;
                                <span onClick={this.sortByNumGames}>&#8645;</span>
                            </th>
                        </tr>
                        {rankList.map(player=> (
                            <tr>
                                <th>{rank+=1}</th>
                                <th>{player.user_id}</th>
                                <th>{player.character_name} <UserDetailInfo userId={player.user_id} userName={player.character_name}/></th>
                                <th>{this.rankColor(player.current_points)}</th>
                                <th>{player.current_points}</th>
                                <th>{player.TotalNumGame}</th>
                            </tr>
                        ))}
                    </table>
                </div>
            </>
        )
    }

    render() {
        return (
            <>
            <Sidebar/>
            <div className="container">
                <h1 className="rankTable-title">Top 100 Leaderboard</h1>
                {this.showingTable()}
            </div>
            </>
        )
    }
}

export default RankingBoard;