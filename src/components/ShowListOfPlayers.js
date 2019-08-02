// Used in ShowRole.js

import React from 'react';

const ShowListOfPlayers = (props) => {
  return(
    <div>
        <div className='button-wrapper'>
          {props.players_with_roles.map((player) => {
            if (player !== props.current_player && player.alive && !(['werewolf', 'werewolf_god', 'weak_werewolf'].includes(props.current_player.role)  && !player.killable)){
              return (
                <button
                  className='button-list'
                  key={player.name}

                  onClick={() => props.choiceConfirmPhase([props.current_player_id, props.current_player, player, Object.keys(props.players_with_roles).length])}
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
      <div className='button-wrapper-dead'>
        {props.players_with_roles.map((player) => {
          if (!player.alive){
            return (
              <button
                key={player.name}
                disabled={true}
                className='button-list-dead'
              >
                <p>{player.name}さん</p>
                <span>死亡</span>
              </button>
            )
        } else {
          return <div key={player.name}></div>
        }})}
      </div>
    </div>
  )
}

export default ShowListOfPlayers;
