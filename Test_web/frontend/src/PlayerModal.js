import React from 'react';
import Modal from "react-modal";
import axios from "axios";

//import css
import "./style/Modal.css"
import "./style/Table.css"


const path = "http://13.59.148.13:8000";
//const path = "http://localhost:8000";


class PlayerModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetailBox: false,
            date: this.props.date,
            playerList: [],
            goInfo: false,
        }
        this.handleOpenDetailBox = this.handleOpenDetailBox.bind(this);
        this.handleCloseDetailBox = this.handleCloseDetailBox.bind(this);
    }

    componentDidMount() {
        this.getPlayedPlayerList();
    }

    handleOpenDetailBox() {
        this.setState({ showDetailBox: true })
        this.getPlayedPlayerList();
    }
    
    handleCloseDetailBox() {
        this.setState({ showDetailBox: false })
    }

    async getPlayedPlayerList() {
        const {data} = await axios.get(`${path}/playersList/${this.props.date}`);
        this.setState({
            playerList: data[0]
        })
    }

    onClickSendTrue() {
        this.setState({goInfo: true})
    }

    render() {
        const { playerList } = this.state;
        // console.log("check for date", date);
        return (
            <span>
                <button onClick={this.handleOpenDetailBox} style={{fontFamily:"Verdana, sans-serif", fontSize: "13px"}}>Show Info</button>
                <Modal isOpen={this.state.showDetailBox} contentLabel="Info Box" className="mymodal" overlayClassName="myoverlay" onRequestClose={this.handleCloseDetailBox}>
                    <h1 className="mainDate" style={{fontFamily:"Verdana, sans-serif", fontSize: "20px"}}>Date:{this.props.date}</h1>
                    <div className="table-wrapper">
                        <table className="playerTable">
                            <tr>
                                <th className="pUserId">User_id</th>
                                <th className="pCharacterName">Character_name</th>
                            </tr>
                            {playerList.map(player => (
                                <tr>
                                    <th>{player.user_id}</th>
                                    <th>
                                        {player.character_name}
                                    </th> 
                                </tr>
                            ))}
                        </table>
                    </div>
                    <button onClick={this.handleCloseDetailBox}>Close</button>
                </Modal>
            </span>
        )
    }
}

export default PlayerModal;