import React from 'react';
import Option from './Option';


const Options = (props) => {
  if (props.players_selected){
    return(<div></div>)
  }
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.players.length === 0 && <p>名前を入力してください｡</p>}
      {
        props.players.map((option) => (
          <Option
            key={option}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          />
        ))
      }
    </div>
  );
};

export default Options;
