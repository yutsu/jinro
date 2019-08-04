// Used in ShowRole.js

import React from 'react';

export default class ShowListOfPlayers extends React.Component {

  shuffle (old_arr) {
    let arr = [...old_arr];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }

  render () {
    return(
      <div>
          <div className='button-wrapper'>
            {this.shuffle(this.props.players_with_roles).map((player) => {
              if (player !== this.props.current_player && player.alive && !(['werewolf', 'werewolf_god', 'weak_werewolf'].includes(this.props.current_player.role)  && !player.killable)){
                return (
                  <button
                    className='button-list'
                    key={player.name}

                    onClick={() => this.props.choiceConfirmPhase([this.props.current_player_id, this.props.current_player, player, Object.keys(this.props.players_with_roles).length])}
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
          {this.props.players_with_roles.map((player) => {
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

}



