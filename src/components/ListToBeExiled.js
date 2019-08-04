import React from 'react';

const ListToBeExiled = (props) => {
  return(
    <div>
      <div className="widget">
        {props.players_with_roles
          .filter((player) => (player.role === 'tolkative' && player.alive === false))
          .map((player) => <div className='widget__message'>{player.name}さんも議論に参加できます。</div>)
        }
      </div>

      <div className='button-wrapper'>
        {props.players_with_roles.map((player) => {
          if (player.alive){
            return (
              <button
                className='button-list'
                key={player.name}
                onClick={(e) => {
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
        } else {
          return <div key={player.name}></div>
        }})}
      </div>
      <div className="button-wrapper">
        <button
          className='button-no-exile'
          key={'no_exile'}
          onClick={(e) => {
            props.choiceConfirmAtExilePhase()
            }
          }
        >
          誰も追放しない。
        </button>
      </div>
      <div className="button-wrapper">
        <button
          className='button-no-exile'
          key={'no_exile'}
          onClick={(e) => {
            props.choiceConfirmAtExilePhase('random')
            }
          }
        >
          ランダムに選ぶ。
        </button>
      </div>
    </div>
    )
}

export default ListToBeExiled;
