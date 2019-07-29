import React from 'react';

const ResultOfNight = (props) => {
  let x = props.handleKilledAtNight();
  console.log(x)
  let y = props.handleWinningSide();
  let suspected_players = props.mostSuspiciousPlayer(x);
  if (y === -1) {
    return(
      <div>
        <p>昨日の犠牲者は{x}さんです｡</p>
        <p>今もっとも疑われているのは</p>
        {suspected_players.map((player) => {
          return <p key={player}>{player}さん</p>;
        })}
        <button
          onClick={props.morningPhase}
        >
          次へ
        </button>
      </div>
      )
  } else if (y === 1) {
    return(
      <div>
        <p>昨日の犠牲者は{x}さんです｡</p>
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
        <p>昨日の犠牲者は{x}さんです｡</p>
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

export default ResultOfNight;
