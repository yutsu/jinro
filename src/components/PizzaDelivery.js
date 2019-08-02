import React from 'react';

const PizzaDelivery = (props) => {
    return(
        <div className='widget'>
            {props.pizza_delivery
            .filter((order) => (order[1] === props.current_player))
            .map((order) => <div className='widget__message'>{order[0].name}さんからピザが届きました。</div>)}
        </div>)
}


export default PizzaDelivery;


// import React from 'react';

// export default class PizzaDelivery extends React.Component {
//     constructor(props) {
//     super(props);

//   }

//   orderForMe () {
//     this.props.pizza_delivery
//     .filter((order) => (order[1] === this.props.current_player))
//     .map((order) => <div>{order[0].name}からピザが届きました。</div>)
//   }

//   render () {
//     return (
//         <div>

//         </div>)
//   }}
