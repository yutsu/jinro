import React from 'react';

const ListToBeExiled = (props) => {
  return(
    <div>
      {props.players_with_roles.map((player) => {
        if (player.alive){
          return (
            <button
              key={player.name}
              onClick={(e) => {
                // props.exile(player)
                props.choiceConfirmAtExilePhase(player)
                }
              }
            >
              {player.name}さんを追放
            </button>
            )
          }
      })}
    </div>
    )
}

export default ListToBeExiled;
