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
      updateNumberOfRoles={props.updateNumberOfRoles}
      />

      <Counter
      role='werewolf'
      updateNumberOfRoles={props.updateNumberOfRoles}
      />
      <button onClick={props.determineRoles}>決定</button>
    </div>
  );
};

export default RoleOptions;
