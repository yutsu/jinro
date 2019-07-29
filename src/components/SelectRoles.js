import React from 'react';

const SelectRoles = (props) => {
  return (
    <div>
      <button
        disabled={!props.hasOptions}
        onClick={props.handleSelectRoles}
      >
        役割の選択へ
      </button>
    </div>
  );
};

export default SelectRoles;
