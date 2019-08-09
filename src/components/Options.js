import React from 'react';
import Option from './Option';


const Options = (props) => {
  return (
    <div>
      <div className='widget-header'>
        <h3 className='widget-header__title'>プレイヤーの名前を入力してください。</h3>
          <button
            className='button button--link'
            onClick={props.handleDeleteOptions}>Remove All
          </button>
      </div>
      {props.players.length === 0 && <p className='widget__message'>名前を入力してください｡</p>}
      {
        props.players.map((option, index) => (
          <Option
            key={option}
            optionText={option}
            count={index + 1}
            handleDeleteOption={props.handleDeleteOption}
          />
        ))
      }
    </div>
  );
};

export default Options;
