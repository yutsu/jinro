import React from 'react';

const PsychicPerceive = (props) => {
    if (props.current_player.night_action === 'perceive') {
        return (
        <div className='widget widget__message'>
            今朝追放された{props.to_be_exiled[0]}さんは{props.to_be_exiled[1] === 0 ? '村人': '人狼'}でした。
        </div>)
    } else {
        return (<span></span>)
    }

}

export default PsychicPerceive;
