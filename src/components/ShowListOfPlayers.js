// Used in ShowRole.js

import React from 'react';

const ShowListOfPlayers = (props) => {
  return(
    <div className='button-wrapper'>
      {props.players_with_roles.map((player) => {
        if (player !== props.current_player && player.alive && !(props.current_player.role === 'werewolf' && !player.killable)){
          return (
            <button
              className='button-list'
              key={player.name}

              onClick={() => props.choiceConfirmPhase([props.current_player_id, props.current_player.role, player, Object.keys(props.players_with_roles).length])}
            >
              <p>{player.name}さん</p>
              <span>を選ぶ｡</span>
            </button>
          )
        } else {
          return (<div key={player.name +'else'}></div>)
        }
      })}
    </div>
    )
}

export default ShowListOfPlayers;
