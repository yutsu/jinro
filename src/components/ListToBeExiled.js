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
      <div className='button-wrapper-dead'>
        {props.players_with_roles.map((player) => {
          if (!player.alive){
            return (
              <button
                disabled={true}
                key={player.name}
                className='button-list-dead'
              >
                <p>{player.name}さん</p>
                <span>死亡</span>
              </button>
            )
        }})}
      </div>
    </div>
    )
}

export default ListToBeExiled;
