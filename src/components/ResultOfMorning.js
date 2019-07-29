import React from 'react';

const ResultOfMorning = (props) => {
  let x = props.to_be_exiled[0];
  let y = props.handleWinningSide();
  if (y === -1) {
    return(
      <div>
        <p>{x}さん, 最後に遺言をどうぞ｡</p>
        <button
          onClick={props.nightPhase}
        >
          次へ
        </button>
      </div>
      )
  } else if (y === 1) {
    return(
      <div>
        <p>{x}さん, 最後に遺言をどうぞ｡</p>
        <h1>人狼の勝利!</h1>
        <button
        onClick={props.restart}
        >
        もう1ゲームする
        </button>
      </div>
      )
  } else if (y === 0) {
    return(
      <div>
        <p>{x}さん, 最後に遺言をどうぞ｡</p>
        <h1>村人の勝利!</h1>
        <button
        onClick={props.restart}
        >
        もう1ゲームする
        </button>
      </div>
      )
  }
}

export default ResultOfMorning;
