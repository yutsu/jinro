import React from 'react';

const JapaneseNames = {
  'villager': '村人',
  'werewolf': '人狼'
}

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    };
  }
  // componentDidMount() {
  //   const stringCount = localStorage.getItem('counter');
  //   const count = parseInt(stringCount, 10);

  //   if (!isNaN(count)) {
  //     this.setState(() => ({ count }));
  //   }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.count !== this.state.count) {
  //     localStorage.setItem('counter', this.state.count);
  //   }
  // }
  handleAddOne() {
    this.props.updateNumberOfRoles(1, this.props.role)
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }
  handleMinusOne() {
    this.setState((prevState) => {
      if (prevState.count === 0){
        return
      }
      this.props.updateNumberOfRoles(-1, this.props.role)
      return {
        count: prevState.count - 1
      };
    });
  }
  handleReset() {
    this.props.updateNumberOfRoles(0, this.props.role)
    this.setState(() => {
      return {
        count: 0
      };
    });
  }
  render() {
    return (
      <div>

        <p>{JapaneseNames[this.props.role]}:{this.state.count}</p>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}
