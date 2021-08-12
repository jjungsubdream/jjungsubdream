import {HashRouter, Route} from "react-router-dom";

import GameHistory from "./GameHistory";
import PlayerHistory from "./PlayersHistory";
import RankingBoard from "./RankingBoard";
import Champions from "./Champions";
import Retention from "./Retention";
import SignIn from "./SignIn";
import Redeem from "./Redeem";

import Cookies from 'universal-cookie';

//link has to be in HashRouter
function App() {
  const cookie = new Cookies();

  return (
    <HashRouter>
    {cookie.get('user') !== 'admin' ? (
      <>
        <Route path="/" exact={true} component={SignIn}/>
      </>
    ):(
      <>
        <Route path="/" exact={true} component={SignIn}/>
        <Route path="/gamerHistory" exact={true} component={GameHistory}/>
        <Route path="/playerHistory" exact={true} component={PlayerHistory}/>
        <Route path="/leaderboard" exact={true} component={RankingBoard}/>
        <Route path="/champions" exact={true} component={Champions}/>
        <Route path="/retention" exact={true} component={Retention}/>     
        <Route path="/redeemCode" exact={true} component={Redeem}/>
      </>
    )}
  </HashRouter>

  )
}

export default App;
