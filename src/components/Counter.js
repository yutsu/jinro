import React from 'react';


export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleLocalMemory = this.handleLocalMemory.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    const stringCount = localStorage.getItem(this.props.role + '-counter');
    const count = parseInt(stringCount, 10);

    if (!isNaN(count)) {
      this.setState(() => ({ count }));
      this.handleLocalMemory(count)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem(this.props.role + '-counter', this.state.count);
    }
  }

  handleLocalMemory (count) {
    this.props.updateNumberOfRoles(count, this.props.role)
  }

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
        <div className='button-wrapper button-wrapper__role'>
          <div className='option-role option__role'>{this.props.role_jp}: {this.state.count > 0 ? <div className='counter'>{this.state.count}</div>: this.state.count}</div>
          <button className='button button--plus-one' onClick={this.handleAddOne}>+1</button>
          <button className='button button--plus-one'  onClick={this.handleMinusOne}>-1</button>
        </div>
      </div>
    );
  }
}
