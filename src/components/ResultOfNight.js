import React from 'react';

const ResultOfNight = (props) => {
  let x = props.handleKilledAtNight(props.turn);
  props.removeProtection(); // xの後におくこと
  let y = props.handleWinningSide();
  let suspected_players = props.mostSuspiciousPlayer(x);


  let victim;
  if (x === -1) {
    victim = 'いませんでした。'
  } else {
    victim = x + 'さんでした。'
  }


  if (y === -1) {
    return(
      <div>
        <p>{props.turn === 1? "" : '昨日の犠牲者は' + victim}</p>
        <p>今もっとも疑われている人は</p>
        {suspected_players.map((player) => {
          return <p key={player}>{player}さん</p>;
        })}
        <p>{!!suspected_players.length ?  'です｡': 'いませんでした｡' }</p>

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
        <p>{props.turn === 1? "" : '昨日の犠牲者は' + victim}</p>
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
        <p>{props.turn === 1? "" : '昨日の犠牲者は' + victim}</p>
        <h1>村人の勝利!</h1>
        <button
        onClick={props.restart}
        >
        もう1ゲームする
        </button>
      </div>
      )
  } else {
    console.log('something wrong with ResultOfNight')
  }

}

export default ResultOfNight;
