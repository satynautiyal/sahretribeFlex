import React, { useState } from 'react';
import { PrimaryButton } from '../Button/Button';
import { useHistory } from 'react-router-dom';
import css from './Dialog.module.css';

const Dialog = () => {
  const [showPopup, setShowPopup] = useState(true);
  const history = useHistory();

  const togglePopup = () => {
    history.push('/');
    setShowPopup(!showPopup);
    history.push('/');
  };

  return (
    <div className={css.main}>
      {/* <button onClick={togglePopup}>Open Popup</button> */}

      {showPopup && (
        <div>
          <div className={css.popup}>
            <h2></h2>
            <p>Verification is completed please return back to your browser</p>
            <PrimaryButton className={css.popUpBack} type="button" onClick={togglePopup}>
              Okay
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
