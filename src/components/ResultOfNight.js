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



  return(
    <div className='widget'>
      <div className='widget widget__message'>
        <p className='option option__text'>朝になりました｡</p>
        <p className='option option__text'>{props.turn === 1? "" : '昨日の犠牲者は' + victim}</p>
        <p className='option option__text'>今もっとも疑われている人は</p>
        {suspected_players.map((player) => {
          return <p className='option option__text bf' key={player}>{player}さん</p>;
        })}
        <p className='option option__text'>{!!suspected_players.length ?  'です｡': 'いませんでした｡' }</p>
      </div>


      <button
        className='button'
        onClick={y < 0 ? props.morningPhase: props.gameResultPhase}
      >
        次へ
      </button>
    </div>
    )

}

export default ResultOfNight;
