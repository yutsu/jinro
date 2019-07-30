import React from 'react';

const WhoWon = (props) => {
    return (
        <div>
            {props.players_with_roles.map((player) => {
                if (player.winning_side === props.winning_side) {
                    return (
                        <p key={player.name}>勝ち! {player.name} ({player.role_jp})</p>
                        )
                    } else {
                        return (
                            <p key={player.name +'lose'}>負け。{player.name} : {player.role_jp}</p>
                            )
                }
                })}
        </div>)
}


export default WhoWon;
