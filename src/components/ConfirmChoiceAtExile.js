import React from 'react';

const ConfirmChoiceAtExile = (props) => {

    let players = props.players_with_roles.filter((player) => (player.alive));
    let random_player = players[Math.floor(Math.random()*players.length)];

    let confirm_message = (
        <div>
            {props.to_be_confirmed === 'random'?
                <div>ランダムに選んでいいですか?</div>:
                <div>{props.to_be_confirmed === undefined ? <div>追放をスキップしますか?</div> :<div>{props.to_be_confirmed.name}さんでいいですか?</div>}
                </div>
            }
        </div>
        )

    let victim = 'victim';
    if (props.to_be_confirmed === 'random') {
        victim = random_player;
    } else {
        victim = props.to_be_confirmed;
    }

    if (!props.hide_options) {
        return (
            <div className='widget widget__confirm'>
                <div className='widget widget__confirm-message'>{confirm_message}</div>
                <div className='button-wrapper'>
                    <button
                        className='button-list'
                        onClick={(e) => props.exile(victim)}
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
