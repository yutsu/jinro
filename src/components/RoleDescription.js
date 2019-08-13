import React from 'react';

export default class RoleDescription extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      toggle: false
    };
  }

  handleToggle() {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle
      };
    });
  }

  classInstances(classes) {
    return classes.map((RoleClass) => (
      new RoleClass('anonymous')
      ))
  }

  render() {
    let instances = this.classInstances(this.props.roleClasses);
    return (
      <div>
        <div className="button-wrapper">
          <button
            className='button-single'
            onClick={this.handleToggle}
            >
            {this.state.toggle ? <p>閉じる</p>: <p>各役職のルールを見る</p>}
          </button>
        </div>
        <div className="widget">
          {this.state.toggle && instances.map((role) => {
            return (
              <div className='widget__message widget__role-description' key={role.role}>
                <div className='widget__role-title'>
                {role.role_jp}
                </div>
                {role.description}
              </div>
              )}
            )
          }
          {this.state.toggle &&
            <button
            className='button'
            onClick={this.handleToggle}
            >
             閉じる
          </button>}
        </div>
      </div>
    );
  }
}
