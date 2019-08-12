import React from 'react';
import WhoWon from './WhoWon';
import Sound from 'react-sound';


const GameResult = (props) => {
    let y = props.handleWinningSide();

    let who_won = (<WhoWon
            winning_side={y}
            players_with_roles={props.players_with_roles}
          />)

    if (y === 1) {
        return(
          <div className='widget'>
            {props.bgm && <Sound
                                  url="sounds/fate2.mp3"
                                  playStatus={Sound.status.PLAYING}
                                />}
            <h1 className='widget widget__important-message'>人狼の勝利!</h1>
            {who_won}
            <button
              className='button'
              onClick={props.restart}
            >
            もう1ゲームする
            </button>
          </div>
        )
    } else if (y === 0) {
        return(
          <div className='widget'>
            {props.bgm && <Sound
                                  url="sounds/trumpet1.mp3"
                                  playStatus={Sound.status.PLAYING}
                                />}
            <h1 className='widget widget__important-message'>村人の勝利!</h1>
            {who_won}

            <button
              className='button-list'
              onClick={props.restart}
            >
            もう1ゲームする
            </button>


          </div>
      )
  }

}

export default GameResult;
