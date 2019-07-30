import React from 'react';

const ConfirmChoiceAtExile = (props) => {

    if (!props.hide_options) {
        return (
            <div>
                {props.to_be_confirmed.name}さんでいいですか?
                <button
                    onClick={(e) => props.exile(props.to_be_confirmed)}
                >
                OKです｡
                </button>
                <button
                    onClick={props.morningPhase}
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

export default ConfirmChoiceAtExile;
