import React from 'react';
import Counter from './Counter';

const RoleOptions = (props) => {
  if (props.players_selected){
    return(<div></div>)
  }
  return (
    <div>
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

      <button onClick={props.determineRoles}>決定</button>
    </div>
  );
};

export default RoleOptions;
