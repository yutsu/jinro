import React from 'react';

const ConfirmIdentity = (props) => {
  let player = props.players_with_roles[props.current_player_id];
  let name = player.name;
  if (player.alive){
    return(
      <div className='widget widget__confirm'>
        <p className='widget widget__message'>プレイヤーを確認します｡</p>
        <p className='widget widget__confirm-message'>{name}さんの番です｡ 本当に｢{name}｣さんですか?</p>
        <button
          className='button'
          onClick={props.nightPhase}
        >
        はい, 私は{name}です｡
        </button>
      </div>
      )
  } else {
    return (
      <div>
        {props.nightPhase()}
      </div>
      )
  }
}

export default ConfirmIdentity;
