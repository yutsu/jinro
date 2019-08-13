import React from 'react';
import Switch from "react-switch";
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default class RandomRoles extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.recordSelectedButton = this.recordSelectedButton.bind(this);
    this.toggleRandomSwitchRoles = this.toggleRandomSwitchRoles.bind(this);
    this.state = {
      toggle: true,
      checked: false,
      level: 0,
      checked_0: true,
      checked_1: false,
      checked_2: false
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

  handleLevelChange(value) {
    value = Number(value);
    this.props.handle_random_level(value);
    this.recordSelectedButton(value);
    }

  recordSelectedButton(value) {
    if (value === 0){
      this.setState({ checked_0: true});
      this.setState({ checked_1: false});
      this.setState({ checked_2: false});
    } else if (value === 1) {
      this.setState({ checked_0: false});
      this.setState({ checked_1: true});
      this.setState({ checked_2: false});
    } else {
      this.setState({ checked_0: false});
      this.setState({ checked_1: false});
      this.setState({ checked_2: true});
    }
  }

  classInstances(classes) {
    return classes.map((RoleClass) => (
      new RoleClass('anonymous')
      ))
  }


  render () {
    let instances = this.classInstances(this.props.roleClasses);
    return (
      <div>
        <div className='switch-wrapper'>
          <label>
                  <span className='switch-sentence'>ランダム化する</span>
                  <Switch onChange={this.onClick} checked={this.state.checked} />
          </label>

          {this.state.checked &&
            <div>
              <RadioGroup onChange={ this.handleLevelChange } horizontal>
                <RadioButton value='0' checked={this.state.checked_0}>
                  小
                </RadioButton>
                <RadioButton value="1" checked={this.state.checked_1}>
                  中
                </RadioButton>
                <RadioButton value="2" checked={this.state.checked_2}>
                  大
                </RadioButton>
              </RadioGroup>
              <div className="widget">
                <div className="widget__message">
                  選んだ役職を次のどれかにランダムで変更します。
                </div>
                <div className='widget__in_rando-wrapper'>
                  <span className="widget__in_random bd">小の場合:</span>
                  <span className='widget__description_in_random'>
                    {instances.map((role) => {
                      return (
                        <span key={role.role}>
                          {role.random_level === 0 ? '・' + role.role_jp + ' ': ''}
                        </span>
                        )})}
                  </span>

                </div>
                <div className='widget__in_rando-wrapper'>
                  <span className="widget__in_random bd">中はさらに次が加わる:</span>
                  <span className='widget__description_in_random'>
                    {instances.map((role) => {
                      return (
                        <span key={role.role}>
                          {role.random_level === 1 ? '・' + role.role_jp + ' ': ''}
                        </span>
                        )})}
                  </span>
                </div>
                <div className='widget__in_rando-wrapper'>
                  <span className="widget__in_random bd">大はさらに次が加わる:</span>
                  <span className='widget__description_in_random'>
                    {instances.map((role) => {
                      return (
                        <span key={role.role}>
                          {role.random_level > 1 ? '・' + role.role_jp + ' ': ''}
                        </span>
                        )})}
                  </span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>)
  }
}
