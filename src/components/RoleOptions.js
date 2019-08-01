import React from 'react';
import Counter from './Counter';



export default class RoleOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  classInstances(classes) {
    return classes.map((RoleClass) => (
      new RoleClass('anonymous')
      ))
  }

  render() {
    let instances = this.classInstances(this.props.roleClasses);

    return(
      <div>
        <div className="widget">
          {instances.map((role_class) => {
            return (
              <Counter
                key={role_class.role}
                role={role_class.role}
                role_jp={role_class.role_jp}
                updateNumberOfRoles={this.props.updateNumberOfRoles}
                />
            )
          })}
        </div>
        <button className='big-button' onClick={this.props.determineRoles}>
         開始する!
       </button>
      </div>
      )
  }
}

