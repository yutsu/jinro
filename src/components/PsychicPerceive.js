import React from 'react';

const PsychicPerceive = (props) => {
    if (props.current_player.night_action === 'perceive' && props.to_be_exiled.length > 0) {
        return (
        <div className='widget widget__message'>
            今朝追放された{props.to_be_exiled[0]}さんは{props.to_be_exiled[1]}でした。
        </div>)
    } else {
        return (<span></span>)
    }

}

export default PsychicPerceive;
