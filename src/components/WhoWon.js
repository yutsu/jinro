import React from 'react';

const WhoWon = (props) => {
    return (
        <div className='widget'>
            {props.players_with_roles.map((player) => {
                if (player.winning_side === props.winning_side) {
                    return (
                        <p className='widget__win-message' key={player.name}>勝ち! {player.name} ({player.role_jp})</p>
                        )
                    } else {
                        return (
                            <p className='widget__message' key={player.name +'lose'}>負け。{player.name} ({player.role_jp})</p>
                            )
                }
                })}
        </div>)
}


export default WhoWon;
