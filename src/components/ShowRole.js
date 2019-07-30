import React from 'react';
import ShowListOfPlayers from './ShowListOfPlayers';
import DisplayWerewolves from './DisplayWerewolves';

const ShowRole = (props) => {
  let player = props.players_with_roles[props.current_player_id];
  let name = player.name;
  let turn_1_sentence = '一番人狼だと思う人を選んでください。 (最初の夜はどの役の人も疑うことのみをします。)'

  if (player.alive){
    return(
      <div>
        <p>{name}さんは{player.role_jp}です｡</p>
        <p>{props.turn === 1? turn_1_sentence: player.action_sentence}</p>
        <ShowListOfPlayers
          current_player={player}
          current_player_id={props.current_player_id}
          players_with_roles={props.players_with_roles}
          nightActionRecord={props.nightActionRecord}
          nextPlayer={props.nextPlayer}
          choiceConfirmPhase={props.choiceConfirmPhase}
        />

        <DisplayWerewolves
          current_player={player}
          players_with_roles={props.players_with_roles}
        />
      </div>
      );
  } else {
    return (
      <div>
        <p>{name}さんは死んでいます｡</p>
        <button
        onClick={() => (
          props.nextPlayer(props.current_player_id, player.role, Object.keys(props.players_with_roles).length))
          }
        >
        次のプレーヤーへ
      </button>
      </div>)
  }

};

export default ShowRole;
