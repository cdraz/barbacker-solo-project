import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as LogoutIcon } from '../../icons/logout-line.svg';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      <LogoutIcon style={{ height: '30px', width: '30px', fill: '#fff' }} />
    </button>
  );
}

export default LogOutButton;
