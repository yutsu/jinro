import React from 'react';
import Counter from './Counter';

const RoleOptions = (props) => {
  if (props.players_selected){
    return(<div></div>)
  }
  return (
    <div className='widget'>
      <Counter
      role='villager'
      role_jp='村人'
      updateNumberOfRoles={props.updateNumberOfRoles}
      />

      <Counter
      role='werewolf'
      role_jp='人狼'
      updateNumberOfRoles={props.updateNumberOfRoles}
      />

      <Counter
      role='seer'
      role_jp='占い師'
      updateNumberOfRoles={props.updateNumberOfRoles}
      />

      <Counter
      role='knight'
      role_jp='騎士'
      updateNumberOfRoles={props.updateNumberOfRoles}
      />

      <Counter
      role='traitor'
      role_jp='裏切り者'
      updateNumberOfRoles={props.updateNumberOfRoles}
      />

      <button className='big-button' onClick={props.determineRoles}>
        開始する!
      </button>
    </div>
  );
};

export default RoleOptions;
