import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining : this.props.setTimerSeconds()
    };
  }

  countDown() {
      if(this.state.remaining > 0) {
            this.setState((prevState) => ({
                  remaining : prevState.remaining - 1
            }));
       }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.countDown(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.remaining > 0) {
      return (
        <div className='widget'>
          <p className='widget__message'>残り<span className='timer'>{Math.floor(this.state.remaining / 60)}分{this.state.remaining % 60}秒</span>以内に決めてください。</p>
        </div>
      );
    } else {
      return (
        <div className='widget'>
          <p className='widget__message'>時間になりました。 投票で追放する人を決めてください。</p>
        </div>
      );
    }
  }
}


