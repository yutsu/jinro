import React from 'react';

const ConfirmIdentity = (props) => {
  let player = props.players_with_roles[props.current_player_id];
  let name = player.name;
  if (player.alive){
    return(
      <div>
        <p>{name}さんの番です｡ 本当に{name}さんですか?</p>
        <button
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
