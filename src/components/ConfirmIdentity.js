import React from 'react';

export default class ConfirmIdentity extends React.Component {
  constructor(props) {
    super(props);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleSecondClick = this.handleSecondClick.bind(this);
    this.state = {
      player: this.props.players_with_roles[props.current_player_id],
      name: this.props.players_with_roles[props.current_player_id].name,
      second_button: true,
      third_button: true
    };
  }

  handleFirstClick () {
    this.setState({ second_button: false })
  }

  handleSecondClick() {
    this.setState({ third_button: false })
  }

  render() {
    if (this.state.player.alive){
      return(
        <div>
          <div className='widget widget__confirm'>
            <p className='widget widget__message'>プレイヤーを確認します｡</p>
            <p className='widget widget__confirm-message'>{this.state.name}さんの番です｡ 本当に｢{this.state.name}｣さんですか?</p>
          </div>
          <div className='button-wrapper'>
            <button
              className='button-list-confirm'
              onClick={this.handleFirstClick}
            >
            はい, 私は{this.state.name}です｡
            </button>
            <button
              className='button-list-confirm'
              disabled={this.state.second_button}
              onClick={this.handleSecondClick}
            >
            はい, 私は{this.state.name}です｡
            </button>
            <button
              className='button-list-confirm'
              disabled={this.state.third_button}
              onClick={this.props.nightPhase}
            >
            はい, 私は{this.state.name}です｡
            </button>
          </div>

        </div>

        )
    } else {
      return (
        <div>
          {this.props.nightPhase()}
        </div>
        )
    }
  }

}



// import React from 'react';

// const ConfirmIdentity = (props) => {
//   let player = props.players_with_roles[props.current_player_id];
//   let name = player.name;
//   if (player.alive){
//     return(
//       <div>
//         <div className='widget widget__confirm'>
//           <p className='widget widget__message'>プレイヤーを確認します｡</p>
//           <p className='widget widget__confirm-message'>{name}さんの番です｡ 本当に｢{name}｣さんですか?</p>
//         </div>
//         <div className='button-wrapper'>
//           <button
//             className='button-single'
//             onClick={props.nightPhase}
//           >
//           はい, 私は{name}です｡
//           </button>
//         </div>

//       </div>

//       )
//   } else {
//     return (
//       <div>
//         {props.nightPhase()}
//       </div>
//       )
//   }
// }

// export default ConfirmIdentity;
