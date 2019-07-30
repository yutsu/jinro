import React from 'react';

const DisplayWerewolves = (props) => {
    if (props.current_player.role === 'werewolf') {
        return (
            <div>
                {props.players_with_roles.map((player) => {
                  if (player !== props.current_player && player.role === 'werewolf'){
                    return (
                        <p>{player.name}さんも{player.role_jp}です｡</p>
                    )
                  }
                })}
            </div>)
    } else {
        return (
            <div>

            </div>)
    }

}

export default DisplayWerewolves;
