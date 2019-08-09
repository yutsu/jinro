import React from 'react';

const DisplayWerewolves = (props) => {
    let werewolf_group = ['werewolf', 'werewolf_god', 'weak_werewolf']

    if (werewolf_group.includes(props.current_player.role)) {
        return (
            <div className='widget'>
                {props.players_with_roles.map((player) => {
                  if (player !== props.current_player && werewolf_group.includes(player.role)){
                    return (
                        <div key={player.name}>
                            <p className='widget widget__important-message' key={player.name}>{player.name}さんも人狼です｡</p>
                        </div>
                    )
                  } else {
                    return (
                        <div key={player.name + 'else'}></div>)
                  }
                })}

                {props.night_action_to_be_killed.length !== 0 && <div className='widget__message'>{props.night_action_to_be_killed[0].name}さんを襲撃する予定です。違う人を襲うことも可能です。</div>}

            </div>)
    } else if (props.current_player.role === 'werewolf_believer') {
        return (
            <div className='widget'>
                {props.players_with_roles.map((player) => {
                  if (player !== props.current_player && werewolf_group.includes(player.role)){
                    return (
                        <p className='widget widget__important-message' key={player.name}>{player.name}さんは人狼です｡</p>
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
