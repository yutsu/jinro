import React from 'react';

const ConfirmChoice = (props) => {
    let info = props.to_be_confirmed[0]

    if (!props.hide_options) {
        return (
            <div className='widget widget__confirm'>
                <div>
                    <p className='widget widget__confirm-message'>{info[2].name}さんでいいですか?</p>
                    <div className='button-wrapper'>
                        <button
                            className='button-list'
                            onClick={(e) => props.nightActionRecord(info[0], info[1], info[2], info[3])}
                        >
                        OKです｡
                        </button>
                        <button
                            className='button-list'
                            onClick={props.nightPhase}
                        >
                        考え直す｡
                        </button>
                    </div>


                </div>
            </div>)
    } else {
        return (
            <div>

            </div>)
    }


}

export default ConfirmChoice;
