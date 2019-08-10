import React from 'react';
import ShowListOfPlayers from './ShowListOfPlayers';
import DisplayWerewolves from './DisplayWerewolves';
import PsychicPerceive from './PsychicPerceive';
import PizzaDelivery from './PizzaDelivery';
import SamuraiAction from './SamuraiAction';

const ShowRole = (props) => {
  let player = props.players_with_roles[props.current_player_id];
  let name = player.name;
  let turn_1_sentence = (
    <div>
      <p className='add-option-action'>人狼だと思う人を選んでください。</p>
      <p>(最初の夜はどの役の人も疑うことのみをします。)</p>
    </div>
    )

  let button_next_player = (
      <div className='button-wrapper'>
        <button
          className='button-single'
          onClick={() => (
          props.nextPlayer(props.current_player_id, player.role, Object.keys(props.players_with_roles).length))
          }
        >
        {player.night_action === 'samurai_kill' ? 'スキップして次のプレーヤーへ': '次のプレーヤーへ'}
        </button>
      </div>
    )

  if (player.alive){
    return(
      <div>
        <div className='widget widget__message'>
          <div className='msize'>{name}さんは<div className='widget__important-message bd lsize'>{player.role_jp}</div>です｡</div>
          {(props.turn === 1 && player.role !== 'impatient_pizzeria')? turn_1_sentence: <p className='add-option-action'>{player.action_sentence}</p>}
        </div>

        {props.turn > 1 ? <PsychicPerceive
          to_be_exiled={props.to_be_exiled}
          turn={props.turn}
          current_player={player}
        /> : <span></span>}

        {props.turn > 1 ? <PizzaDelivery
          pizza_order={props.pizza_order}
          pizza_delivery={props.pizza_delivery}
          current_player={player}
        /> : <span></span>}

        {props.turn > 1 ? <SamuraiAction
          current_player={player}
        />  : <span></span>}
        {(player.night_action === 'samurai_kill' && player.can_skip_action) && button_next_player}

        <DisplayWerewolves
          current_player={player}
          players_with_roles={props.players_with_roles}
          night_action_to_be_killed={props.night_action_to_be_killed}
        />

        {(props.turn === 1 || player.night_action !== 'hide') ? <ShowListOfPlayers
          current_player={player}
          current_player_id={props.current_player_id}
          players_with_roles={props.players_with_roles}
          nightActionRecord={props.nightActionRecord}
          nextPlayer={props.nextPlayer}
          choiceConfirmPhase={props.choiceConfirmPhase}
        />:
        {button_next_player}}


      </div>
      );
  } else {
    return (
      <div>
        <p className='widget widget__message'>{name}さんは死んでいます｡</p>
        {button_next_player}
      </div>)
  }

};

export default ShowRole;
