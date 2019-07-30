import React from 'react';
import WhoWon from './WhoWon';

const ResultOfMorning = (props) => {
  let x = props.to_be_exiled[0];
  let y = props.handleWinningSide();



  let who_won = (<WhoWon
          winning_side={y}
          players_with_roles={props.players_with_roles}
        />)


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
        {who_won}
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
        {who_won}
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
