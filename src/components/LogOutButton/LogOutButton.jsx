import React from 'react';
import { useDispatch } from 'react-redux';

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
      <img src="https://cdn-icons-png.flaticon.com/512/1286/1286853.png" alt="logout-button" style={{ height: 30, width: 30 }}/>
    </button>
  );
}

export default LogOutButton;
