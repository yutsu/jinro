import React from 'react';

const ShowListOfPlayers = (props) => {
  return(
    <div>
      {props.players_with_roles.map((player) => {
        if (player !== props.current_player && player.alive){
          return (
            <button
              key={player.name}
              onClick={(e) => {
                props.nightActionRecord(props.current_player_id, props.current_player.role, player, Object.keys(props.players_with_roles).length)}
              }
            >
              {player.name}さんを選ぶ｡
            </button>
            )
        }
      })}
    </div>
    )
}

export default ShowListOfPlayers;
