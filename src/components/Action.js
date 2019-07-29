import React from 'react';

const Action = (props) => {
  if (props.players_selected){
    return(<div></div>)
  }
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );
};

export default Action;
