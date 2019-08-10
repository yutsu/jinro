import React from 'react';

const SamuraiAction = (props) => {
    let choice_statement = (
        <div>
            <div className='widget__message'>
                斬殺する人を選ぶか, このターンは何もしないかを選んでください。
            </div>
        </div>
        )
    return (
        <div className='widget'>
            {(props.current_player.night_action === 'samurai_kill' && props.current_player.can_skip_action) && choice_statement}
        </div>
        )
}

export default SamuraiAction;
