import React from 'react';
import ShowListOfPlayers from './ShowListOfPlayers';

const JapaneseNames = {
  'villager': '村人',
  'werewolf': '人狼'
}

const ShowRole = (props) => {
  let player = props.players_with_roles[props.current_player_id];
  let name = player.name;

  if (player.alive){
    return(
      <div>
        <p>{name}さんは{JapaneseNames[player.role]}です｡</p>
        <p>{player.action_sentence}</p>
        <ShowListOfPlayers
          current_player={player}
          current_player_id={props.current_player_id}
          players_with_roles={props.players_with_roles}
          nightActionRecord={props.nightActionRecord}
        />
      </div>
      );
  } else {
    return (
      <div>
        <p>{name}さんは死んでいます｡</p>
        <button
        onClick={(e) => (
          props.nextPlayer(props.current_player_id, player.role, player, Object.keys(props.players_with_roles).length))
          }
        >
        次のプレーヤーへ
      </button>
      </div>)
  }

};

export default ShowRole;
