import React from 'react';

const ListToBeExiled = (props) => {
  return(
    <div>
      <div className='button-wrapper'>
        {props.players_with_roles.map((player) => {
          if (player.alive){
            return (
              <button
                className='button-list'
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
            } else {
              return (<div key={player.name + 'ListToBeExiled'}></div>)
            }
        })}
      </div>
    </div>
    )
}

export default ListToBeExiled;
