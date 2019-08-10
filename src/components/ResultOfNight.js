import React from 'react';


const ResultOfNight = (props) => {
  let x = props.handleKilledAtNight(props.turn);
  props.removeProtection(); // xの後におくこと
  let z = props.handleSamuraiKilledAtNight(props.turn);
  if (z !== -1) {
    z = [...new Set(z)]
  }

  let y = props.handleWinningSide();

  let suspected_players = props.mostSuspiciousPlayer(x, z);
  let baker_alive = props.isBakerAlive();

  let victim = '';
  if (x === -1 && z === -1) {
    victim = 'いません'
  } else if (x === -1){
    let name;
    // shuffle
    for (let i = z.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [z[i], z[j]] = [z[j], z[i]];
    }

    for (name of z) {
      victim += ' ' + name + 'さん'
      }

  } else if (z === -1){
    victim = x + 'さん'
  } else {
    if (!z.includes(x)){
      z.push(x);
    }

    // shuffle
    for (let i = z.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [z[i], z[j]] = [z[j], z[i]];
    }

    let name;
    for (name of z) {
      if (x !== z) {
        victim += ' ' + name + 'さん'
      }
    }
  }

  return(
    <div className='widget'>
      <div className='widget widget__message'>
        <p className='option option__text'>朝になりました｡</p>
        {baker_alive && <p className='option option__text'>パンの香ばしい香りが漂っています。</p>}
        <p className='option option__text'>{props.turn === 1? "" : '昨日の犠牲者は' + victim + 'でした。'}</p>
        <p className='option option__text'>今もっとも疑われている人は</p>
        {suspected_players.map((player) => {
          return <p className='option option__text bf' key={player}>{player}さん</p>;
        })}
        <p className='option option__text'>{!!suspected_players.length ?  'です｡': 'いませんでした｡' }</p>
      </div>

      <div className="button-wrapper">
        <button
          className='button-single'
          onClick={y < 0 ? props.morningPhase: props.gameResultPhase}
        >
          次へ
        </button>
      </div>
    </div>
    )

}

export default ResultOfNight;
