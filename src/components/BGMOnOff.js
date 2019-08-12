import React from 'react';
import Switch from "react-switch";

export default class BGMOnOff extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleBGM = this.handleBGM.bind(this);
    this.state = {
      toggle: true,
      checked: true
    };
  }

  onClick(checked) {
    this.handleToggle();
    this.handleBGM();
    this.handleChange(checked);
  }

  handleToggle () {
    this.setState((prevState) => ({
      toggle: !prevState.toggle
    }))
  }

  handleBGM() {
    this.props.handleBGM();
  }

  handleChange(checked) {
      this.setState({ checked });
    }


  render () {
    return (
      <div>
        <div className='switch-wrapper'>
          <label>
                  <span className='switch-sentence'>BGMを有効化</span>
                  <Switch onChange={this.onClick} checked={this.state.checked} />
          </label>
        </div>
      </div>)
  }
}
