import React from 'react';

const DisplayWerewolves = (props) => {
    if (props.current_player.role === 'werewolf') {
        return (
            <div className='widget'>
                {props.players_with_roles.map((player) => {
                  if (player !== props.current_player && player.role === 'werewolf'){
                    return (
                        <p className='widget widget__important-message' key={player.name}>{player.name}さんも{player.role_jp}です｡</p>
                    )
                  } else {
                    return (
                        <div key={player.name + 'else'}></div>)
                  }
                })}
            </div>)
    } else {
        return (
            <div key='DisplayWerewolves.js-1'></div>)
    }

}

export default DisplayWerewolves;
