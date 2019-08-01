import React from 'react';

const ResultOfMorning = (props) => {
  let x = props.to_be_exiled[0];
  let y = props.handleWinningSide();


  return(
    <div className='widget'>
      <p className='widget widget__message'>{x}さん, 最後に遺言をどうぞ｡</p>
      <div className="button-wrapper">
        <button
          className='button-single'
          onClick={ y < 0 ? props.nightConfirmPhase: props.gameResultPhase}
        >
          次へ
        </button>
      </div>
    </div>
    )
}
export default ResultOfMorning;
