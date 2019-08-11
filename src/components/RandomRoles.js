import React from 'react';


export default class RandomRoles extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleRandomSwitchRoles = this.toggleRandomSwitchRoles.bind(this);
    this.state = {
      toggle: true
    };
  }

  onClick() {
    this.handleToggle();
    this.toggleRandomSwitchRoles();
  }

  handleToggle () {
    this.setState((prevState) => ({
      toggle: !prevState.toggle
    }))
  }

  toggleRandomSwitchRoles() {
    this.props.toggleRandomSwitchRoles();
  }



  render () {
    return (
      <div>
        <div className='button-wrapper'>
          <button
            className='button-single'
            onClick={this.onClick}
          >
           {this.state.toggle? 'ランダム化する(現在無効中)': 'ランダム化しない(現在有効中)'}
          </button>
        </div>

      </div>)
  }
}
