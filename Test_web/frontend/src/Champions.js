import React from 'react';
import axios from "axios";

//import css
import "./style/Champions.css";

//import image
import Kinuta from "./image/Kinuta.jpg";
import Kito from "./image/Kito.jpg";
import Arwen from "./image/Arwen.jpg";
import Iris from "./image/Iris.jpg";
import Roku from "./image/Roku.jpg"
import JJ from "./image/JJ.jpg";
import Katherine from "./image/Katherine.jpg";
import Horigoshi from "./image/Horigoshi.jpg";
import Mary from "./image/Mary.jpg";
import Lia from "./image/Lia.jpg"
import Sidebar from './Sidebar';

const path = "http://13.59.148.13:8000";
//const path = "http://localhost:8000";

const ChampionsList = [
    {
        id: 0,
        name: "Kinuta",
        image: Kinuta,
        type: ["Carry"]        
    },
    {
        id: 1,
        name: "Kito",
        image: Kito,
        type: ["Support"]        
    },
    {
        id: 2,
        name: "Arwen",
        image: Arwen,
        type: ["Carry"]        
    },
    {
        id: 3,
        name: "Iris",
        image: Iris,
        type: ["Support"]        
    },
    {
        id: 4,
        name: "Roku",
        image: Roku,
        type: ["Jungle", "Assassin"]        
    },
    {
        id: 5,
        name: "JJ",
        image: JJ,
        type: ["Carry"]        
    },
    {
        id: 6,
        name: "Katherine",
        image: Katherine,
        type: ["Carry"]        
    },
    {
        id: 7,
        name: "Horigoshi",
        image: Horigoshi,
        type: ["Jungle"]        
    },
    {
        id: 8,
        name: "Mary",
        image: Mary,
        type: ["Jungle", "Support"]        
    },
    {
        id: 9,
        name: "Lia",
        image: Lia,
        type: ["Carry"]        
    },

]

let totalPick = 0;

class Champions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            championsList: ChampionsList,
            select: "All",
            numPickList: [],
            numWinList: [],
        }
        this.onClickWinRate = this.onClickWinRate.bind(this);
        this.onClickPickRate = this.onClickPickRate.bind(this);
    }

    componentDidMount() {
        this.callDataInOrder();
    }
    
    async getNumPick () {
        const {data} = await axios.get(`${path}/getNumPick`);
        return data;
    }

    async getNumWin () {
        const {data} = await axios.get(`${path}/getNumWin`);
        return data;
    }

    async callDataInOrder() {
        const pickData = await this.getNumPick();
        const winData = await this.getNumWin();

        pickData.forEach((pick) => {
            totalPick += pick.numPick;
        });

        for(let i=0; i<ChampionsList.length; i++) {
            ChampionsList[i].pickRate = (pickData[i].numPick/totalPick).toFixed(2);
            ChampionsList[i].winRate = (winData[i].numWin/pickData[i].numPick).toFixed(2);
        };
        this.setState({
            championsList: ChampionsList
        })
    }

    sortChampions(type) {
        const championsList = ChampionsList.slice();
        const tempList = [];
        if(type === "All") {
            championsList.forEach((champion) => {
                tempList.push(champion);
            })
        } else if(type === "Jungle") {
            championsList.forEach((champion) => {
                champion.type.forEach((tempType) => {
                    if(tempType === "Jungle") {
                        tempList.push(champion);
                    }
                })
            })
        } else if(type === "Assassin") {
            championsList.forEach((champion) => {
                champion.type.forEach((tempType) => {
                    if(tempType === "Assassin") {
                        tempList.push(champion);
                    }
                })
            })
        } else if(type === "Support") {
            championsList.forEach((champion) => {
                champion.type.forEach((tempType) => {
                    if(tempType === "Support") {
                        tempList.push(champion);
                    }
                })
            })
        } else if(type === "Carry") {
            championsList.forEach((champion) => {
                champion.type.forEach((tempType) => {
                    if(tempType === "Carry") {
                        tempList.push(champion);
                    }
                })
            })
        } 
        // console.log(tempList);
        
        return (
            <div className="champions-img-table">
                {tempList.map((champion) => 
                    (
                        <div className="">
                            <img src={champion.image} alt="champion" style={{width: 80}} className="champions-img-protrait"></img><br/>
                            <span style={{fontFamily: "Verdana, sans-serif", fontSize: "13px"}}>{champion.name}</span>
                        </div>
                    )
                )}  
            </div>
        )
    }

    onClickWinRate() {
        console.log("Hello Win")
        let tempChampionList = ChampionsList.slice();
        tempChampionList = tempChampionList.sort((a,b) => {
            if(a.winRate > b.winRate) {
                return -1;
            } 
            if(a.winRate < b.winRate) {
                return 1;
            }
            return 0;
        })
        // ChampionsList = tempChampionList;
        this.setState({
            championsList: tempChampionList
        })
    }

    onClickPickRate() {
        console.log("Hello Pick")
        let tempChampionList = ChampionsList.slice();
        tempChampionList = tempChampionList.sort((a,b) => {
            if(a.pickRate > b.pickRate) {
                return -1;
            } 
            if(a.pickRate < b.pickRate) {
                return 1;
            }
            return 0;
        })
        this.setState({
            championsList: tempChampionList
        })
    }

    render() {
        const {championsList, select} = this.state;
        return (
            <>
            <Sidebar/>
            <div className="champions-wrapper">
                <div className="champions-type">
                    <table>
                        <tr>
                            <th className="champions-type-content" onClick={() => this.setState({select: "All"})}>All</th>
                            <th className="champions-type-content" onClick={() => this.setState({select: "Jungle"})}>Jungle</th>
                            <th className="champions-type-content" onClick={() => this.setState({select: "Assassin"})}>Assassin</th>
                            <th className="champions-type-content" onClick={() => this.setState({select: "Support"})}>Support</th>
                            <th className="champions-type-content" onClick={() => this.setState({select: "Carry"})}>Carry</th>
                        </tr>
                    </table>
                </div>
                <div className="champions-ranking-menu">
                    <span className="champions-ranking-menu-title">Champion Ranking</span>
                    <div>
                        <table className="champions-ranking-menu-table">
                            <tr>
                                <th><span onClick={this.onClickWinRate}>Win Rate</span></th>
                                <th><span onClick={this.onClickPickRate}>Pick Rate</span></th>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="champions-ranking">
                    <table className="champions-ranking-table">
                        <tr>
                            <th style={{width: "20%"}}>Number</th>
                            <th style={{width: "40%"}}>Champion</th>
                            <th style={{width: "20%"}}>Win Rate</th>
                            <th style={{width: "20%"}}>Pick Rate</th>
                        </tr>
                        {championsList.map(champion => 
                            (
                                <tr>
                                    <th style={{width: "20%"}}>{champion.id+1}</th>
                                    <th style={{width: "40%"}}>{champion.name}</th>
                                    <th style={{width: "20%"}}>{(champion.winRate*100).toFixed(1)}%</th>
                                    <th style={{width: "20%"}}>{(champion.pickRate*100).toFixed(1)}%</th>
                                </tr>
                            )
                        )}
                    </table>
                </div>
                <div className="champions-img">
                    {this.sortChampions(select)}
                </div>
            </div>
            </>
        )
    }
}

export default Champions;
