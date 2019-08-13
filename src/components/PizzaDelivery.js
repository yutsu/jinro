import React from 'react';

const PizzaDelivery = (props) => {
    return(
        <div className='widget'>
            {props.pizza_delivery
            .filter((order) => (order[1] === props.current_player))
            .map((order) => <div key={order[0].name} className='widget__message_action_result'>{order[0].name}さんからピザが届きました。</div>)}
        </div>)
}


export default PizzaDelivery;

