const http = require("http");
const express = require("express");
const db = require('./db_connect.js')
const db2 = require('./db_connect2.js')
const port = 8000;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//login part
app.post("/login", (req, res)=> {
    const id = req.body.id;
    const password = req.body.password;
    var sql = "select * from admin_data a where a.id = ? and a.password = ?;" 
    db2.query(sql, [id, password], (error, result) => {
        if(error) {
            console.log(error);
        } else {
            if(result.length>0) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "*");
                res.json({result: true});
            } else {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "*");
                res.json({result: false});
            }
        }
    })
})

//log out part
app.get("/logout", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.json({result: true});
})

//call the number of total played game per day
app.get("/totalPlayedGame", function(req, res){
    var tempData = [];
    var sql = "call iesp_GetTotalPlayedGamePerDay();"
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            console.log(result);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            for(var i=0; i<result[0].length; i+=1) {
                tempData.push({
                    date: String(result[0][i].date.toISOString().substring(0,10)),
                    NumPlayedGame: result[0][i].NumPlayedGame,
                    NumUnfinishedGame: result[0][i].NumUnfinishedGame,
                })
            }
            res.json(tempData);
        }
    })
})

//call number of players played per day
app.get("/playedPlayers", function(req, res) {
    var tempData = [];
    var sql = "call iesp_GetNumPlayedPlayersPerDay();"
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            for(var i=0; i<result[0].length; i+=1) {
                tempData.push({
                    date: String(result[0][i].date.toISOString().substring(0,10)),
                    NumPlayedPlayer: result[0][i].NumPlayedPlayer,
                    NumTotalPlayedPlayer: result[0][i].NumTotalPlayedPlayer
                })
            }
            res.json(tempData);
        }
    })
})

//click the player count -> see the who played
app.get("/playersList/:date", function(req, res) {
    const tempDate = req.params.date + "%";
    var sql = "call iesp_getUserData(?);"
    db.query(sql, [tempDate], function(error,result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result);
        }
    })
})

//click the match count -> see the who played in that each match
app.get("/gamesList/:date", function(req,res) {
    const tempDate = req.params.date + "%";
    var sql = "call iesp_getGameData(?)"
    db.query(sql, [tempDate], function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result);
        }
    })
})

//get rank from 1st to 100th (depends on id value)
app.get("/getRank/:id", function(req,res) {
    const tempId = req.params.id;
    var sql = "call iesp_GetRank(?)"
    db.query(sql, [tempId], function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result);
        }
    })
})

//get to the number of total played games so far
app.get("/getTotalPlayedGames", function(req, res) {
    var sql = "call iesp_GetTotalPlayedGame()";
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result[0]);
        }
    })
})

//get to the number of total played players so far
app.get("/getTotalPlayedPlayers", function(req, res) {
    var sql = "call iesp_GetTotalPlayedPlayer();";
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result[0]);
        }
    })
})

//get how many each champion get picked
app.get("/getNumPick", function(req,res) {
    var sql = "call iesp_GetNumPick();";
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result[0]);
        }
    })
})

//get how many each champion win
app.get("/getNumWin", function(req,res) {
    var sql = "call iesp_GetNumWin();";
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result[0]);
        }
    })
})

//get the selected user game history
app.get("/getUserHistory/:id", function(req, res) {
    let tempData = [];
    const tempId = req.params.id;
    var sql = "call iesp_GetUserHistory(?)";
    db.query(sql, [tempId], function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            for(let i=0; i<result[0].length; i++) {
                let tempKDA
                if(result[0][i].total_deaths === 0) {
                    tempKDA = "Perfect KDA"
                } else {
                    tempKDA = ((result[0][i].total_kills+result[0][i].total_assists)/result[0][i].total_deaths).toFixed(2)
                }
                
                tempData.push({
                    ...result[0][i],
                    time_created: String(result[0][i].time_created.toISOString().substring(0,10)) + " " + String(result[0][i].time_created.toISOString().substring(11,19)),
                    record: `${result[0][i].total_kills}-${result[0][i].total_deaths}-${result[0][i].total_assists}`,
                    KDA : tempKDA
                })
            }
            res.json(tempData)
            //res.json(result[0]);
        }
    })
})

//get the user player history by searching user id
app.get("/searchUser/:id", function(req, res) {
    let tempData = [];
    const tempId = req.params.id;
    var sql = "call iesp_GetSearchUser(?);";
    db.query(sql, [tempId] ,function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            for(let i=0; i<result[0].length; i++) {
                let tempResult = "Defeat";
                if(result[0][i].team_id === result[0][i].team_win_id) {
                    tempResult = "Victory"
                }

                tempData.push({
                    ...result[0][i],
                    time_created: String(result[0][i].time_created.toISOString().substring(0,10)) + " " + String(result[0][i].time_created.toISOString().substring(11,19)),
                    result: tempResult
                })
            }
            res.json(tempData);
        }
    })
})

//get all players list if player played at least one time
//this result is used for calculation of retention rate
app.get("/getUserListAtLeast1", function(req, res) {
    var sql = "call iesp_GetPlayedPlayerAtLeast1();"
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result[0]);
        }
    })
})

//get giftcode info
app.get("/getGiftCode", function(req, res) {
    var sql = "call iesp_GetGiftCode();"
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.json(result[0]);
        }
    })
})


//get giftcode info by description group
app.get("/getGiftCodeByDescription", function(req, res) {
    var sql = "call iesp_GetGiftCodeByGroup();"
    db.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");

            res.json(result[0]);
        }
    })
})


app.use("/", express.static("../frontend/build"))

//create server
http.createServer(app).listen(port, function() {
    console.log(`Server started on Port ${port}!`);
})
