import React from 'react';

const DisplayWerewolves = (props) => {
    if (props.current_player.role === 'werewolf') {
        return (
            <div className='widget'>
                {props.players_with_roles.map((player) => {
                  if (player !== props.current_player && player.role === 'werewolf'){
                    return (
                        <div>
                            <p className='widget widget__important-message' key={player.name}>{player.name}さんも{player.role_jp}です｡</p>
                            {props.night_action_to_be_killed.length === 0 ? <div></div>: <div className='widget__message'>{props.night_action_to_be_killed[0].name}さんを襲撃する予定です。違う人を襲うことも可能です。</div>}
                        </div>

                    )
                  } else {
                    return (
                        <div key={player.name + 'else'}></div>)
                  }
                })}
            </div>)
    } else if (props.current_player.role === 'werewolf_believer') {
        return (
            <div className='widget'>
                {props.players_with_roles.map((player) => {
                  if (player !== props.current_player && player.role === 'werewolf'){
                    return (
                        <p className='widget widget__important-message' key={player.name}>{player.name}さんは{player.role_jp}です｡</p>
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
