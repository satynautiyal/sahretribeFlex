import React, { useEffect } from 'react';

import css from './BackButton.module.css';
import { useHistory } from 'react-router-dom';
import { PrimaryButton } from '../Button/Button';

const BackButton = () => {
  const history = useHistory();
  const goBack = () => {
    let back_path = localStorage.getItem('back_path');
    if (back_path.includes('upcoming-sessions') && history.location.pathname.includes('account')) {
      history.push(back_path);
    } else {
      history.goBack();
    }
  };
  //   useEffect(()=>{
  //     console.log('upcoming-sessions',history)

  // // localStorage.setItem('back_path',)
  //   },[])
  return (
    <PrimaryButton className={css.backButton} type="button" onClick={goBack}>
      Back
    </PrimaryButton>
  );
};

export default BackButton;
