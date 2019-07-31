import React from 'react';

const ConfirmChoiceAtExile = (props) => {

    if (!props.hide_options) {
        return (
            <div className='widget widget__confirm'>
                <p className='widget widget__confirm-message'>{props.to_be_confirmed.name}さんでいいですか?</p>
                <div className='button-wrapper'>
                    <button
                        className='button-list'
                        onClick={(e) => props.exile(props.to_be_confirmed)}
                    >
                    OKです｡
                    </button>
                    <button
                        className='button-list'
                        onClick={props.morningPhase}
                    >
                    考え直す｡
                    </button>
                </div>
            </div>)
    } else {
        return (
            <div>

            </div>)
    }


}

export default ConfirmChoiceAtExile;
