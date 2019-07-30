// Used in ShowRole.js

import React from 'react';

const OutcomeOfSeer = (props) => {
    let next_player = (
        <button
          key="ShowListOfPlayersNextPlayer"
          onClick={(e) => {
            props.nextPlayer(props.current_player_id, props.current_player.role,  Object.keys(props.players_with_roles).length)
          }}
        >
        次のプレーヤーへ
        </button>
        )

    if (props.current_player.role === 'seer'){
        try{
            return (
                <div>
                    {props.outcome_of_seer[0].name}さんは{props.outcome_of_seer[0].side === 0? '村人':'人狼'}です｡
                    {next_player}
                </div>)
        }

        catch(err){
            return (
                <div>
                    {next_player}
                </div>)
        }

    } else {
        return (
            <div>
                {next_player}
            </div>)
    }

}

export default OutcomeOfSeer;
