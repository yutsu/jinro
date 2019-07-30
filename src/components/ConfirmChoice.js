import React from 'react';

const ConfirmChoice = (props) => {
    let info = props.to_be_confirmed[0]

    if (!props.hide_options) {
        return (
            <div>
                {info[2].name}さんでいいですか?
                <button
                    onClick={(e) => props.nightActionRecord(info[0], info[1], info[2], info[3])}
                >
                OKです｡
                </button>
                <button
                    onClick={props.nightPhase}
                >
                考え直す｡
                </button>
            </div>)
    } else {
        return (
            <div>

            </div>)
    }


}

export default ConfirmChoice;
