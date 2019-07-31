import React from 'react';
import ShowListOfPlayers from './ShowListOfPlayers';
import DisplayWerewolves from './DisplayWerewolves';
import PsychicPerceive from './PsychicPerceive';

const ShowRole = (props) => {
  let player = props.players_with_roles[props.current_player_id];
  let name = player.name;
  let turn_1_sentence = (
    <div>
      <p>一番人狼だと思う人を選んでください。</p>
      <p>(最初の夜はどの役の人も疑うことのみをします。)</p>
    </div>
    )

  if (player.alive){
    return(
      <div>
        <div className='widget widget__message'>
          <p className='msize'>{name}さんは<span className='widget__important-message bd lsize'>{player.role_jp}</span>です｡</p>
          {props.turn === 1? turn_1_sentence: player.action_sentence}
        </div>

        {props.turn > 1 ? <PsychicPerceive
          to_be_exiled={props.to_be_exiled}
          turn={props.turn}
          current_player={player}
        /> : <span></span>}

        <DisplayWerewolves
          current_player={player}
          players_with_roles={props.players_with_roles}
        />

        <ShowListOfPlayers
          current_player={player}
          current_player_id={props.current_player_id}
          players_with_roles={props.players_with_roles}
          nightActionRecord={props.nightActionRecord}
          nextPlayer={props.nextPlayer}
          choiceConfirmPhase={props.choiceConfirmPhase}
        />


      </div>
      );
  } else {
    return (
      <div>
        <p className='widget widget__message'>{name}さんは死んでいます｡</p>
        <button
          className='button'
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
