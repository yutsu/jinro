import React from 'react';
import Switch from "react-switch";

export default class RandomRoles extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleRandomSwitchRoles = this.toggleRandomSwitchRoles.bind(this);
    this.state = {
      toggle: true,
      checked: false
    };
  }

  onClick(checked) {
    this.handleToggle();
    this.toggleRandomSwitchRoles();
    this.handleChange(checked);
  }

  handleToggle () {
    this.setState((prevState) => ({
      toggle: !prevState.toggle
    }))
  }

  toggleRandomSwitchRoles() {
    this.props.toggleRandomSwitchRoles();
  }

  handleChange(checked) {
      this.setState({ checked });
    }


  render () {
    return (
      <div>
        <div className='switch-wrapper'>
          <label>
                  <span className='switch-sentence'>ランダム化する</span>
                  <Switch onChange={this.onClick} checked={this.state.checked} />
          </label>
        </div>
      </div>)
  }
}
