import React from 'react';
import Modal from "react-modal";
import axios from "axios";

//import css
import "./style/Modal.css"
import "./style/Table.css"

const path = "http://13.59.148.13:8000";
//const path = "http://localhost:8000";

class GameModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetailBox: false,
            date: this.props.result,
            gameList: [],
        }
        this.handleOpenDetailBox = this.handleOpenDetailBox.bind(this);
        this.handleCloseDetailBox = this.handleCloseDetailBox.bind(this);
        this.addRowspan = this.addRowspan.bind(this);
    }

    componentDidMount() {
        //this.getPlayedGameList();
    }


    handleOpenDetailBox() {
        this.setState({ showDetailBox: true });
        this.getPlayedGameList();
    }
    
    handleCloseDetailBox() {
        this.setState({ showDetailBox: false })
    }
    
    async getPlayedGameList() {
        const {data} = await axios.get(`${path}/gamesList/${this.props.result}`);
        this.setState({
            gameList: data[0]
        }, this.addRowspan(data[0]));
    }

    addRowspan(dataTable) {
        let count = 0;
        for(const i of dataTable) {
            i.duplicate = false;
        }
        for(let i=0; i<dataTable.length; i+=1) {
            for(let j=i; j<dataTable.length; j+=1) {
                if(dataTable[i].game_id === dataTable[j].game_id) {
                    count += 1;
                }

                if(i !== j && dataTable[j].game_id === dataTable[j-1].game_id) {
                    dataTable[j].duplicate = true;
                } 
            }
            dataTable[i].rowSpan = count;
            if(dataTable[i].rowSpan >= 10) {
                dataTable[i].checkbox = true;
            } else {
                dataTable[i].checkbox = false;
            }
            count = 0;
        }
    }


    render() {
        const { gameList } = this.state;
        return (
            <span>
                <button onClick={this.handleOpenDetailBox} style={{fontFamily:"Verdana, sans-serif", fontSize: "13px"}}>Show Info</button>
                <Modal isOpen={this.state.showDetailBox} contentLabel="Info Box" className="mymodal" overlayClassName="myoverlay" onRequestClose={this.handleCloseDetailBox}>
                    <h1 className="mainDate" style={{fontFamily:"Verdana, sans-serif", fontSize: "20px"}}>Date:{this.props.result}</h1>
                    <div className="table-wrapper">
                        <table className="gameTable">
                            <tr>
                                <th className="gGameId">Game_id</th>
                                <th className="gMode">Mode</th>
                                <th className="gDate">Time_Created</th>
                                <th className="gDate">Time_End</th>
                                <th className="gUserId">User_Id</th>
                                <th className="gCharacterName">Character_Name</th>
                            </tr>
                            {gameList.map((game) =>
                                !game.duplicate ? 
                                (<tr>
                                    <th rowspan={game.rowSpan}>
                                        {game.checkbox ? 
                                            <span>&#9989;</span>
                                            : null
                                        }
                                        {game.game_id}
                                    </th>
                                    <th rowSpan={game.rowSpan}>{game.mode_id}</th>
                                    <th rowSpan={game.rowSpan}>{game.time_created.substring(11,19)}</th>
                                    <th rowSpan={game.rowSpan}>{game.time_ended.substring(11,19)}</th>
                                    <th>{game.user_id}</th>
                                    <th>
                                        {(game.team_id === 3) ? 
                                            <span>&#128065;</span>
                                            : null
                                        }
                                        {game.character_name}
                                    </th>
                                </tr>):
                                (
                                    <tr>
                                        <th>{game.user_id}</th>
                                        <th>
                                        {(game.team_id === 3) ? 
                                            <span>&#128065; </span>
                                            : null
                                        }
                                        {game.character_name}
                                        </th>
                                    </tr>
                                )
                            )}
                        </table>
                    </div>
                    <button onClick={this.handleCloseDetailBox}>Close</button>
                </Modal>
            </span>
        )
    }
}

export default GameModal;