// Used in ShowRole.js

import React from 'react';

const OutcomeOfSeer = (props) => {
    let current_player = props.players_with_roles[props.current_player_id];
    let next_player = (
        <button
          key="ShowListOfPlayersNextPlayer"
          onClick={(e) => {
            props.nextPlayer(props.current_player_id, current_player.role,  Object.keys(props.players_with_roles).length)
          }}
        >
        次のプレーヤーへ
        </button>
        )

    if (current_player.role === 'seer' && props.hide_options){
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
                </div>)
        }

    } else if (props.hide_options){
        return (
            <div>
            {next_player}
            </div>)
    } else {
        return (
            <div>

            </div>)
    }


}

export default OutcomeOfSeer;
