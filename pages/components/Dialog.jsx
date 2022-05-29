import { useEffect } from 'react';
import styles from '../../styles/dialog.module.css';

export default function Dialog({ isOpen, dialogTitle, close }) {
  const onSubmit = (event) => {
    event.preventDefault();
    close({type: 'CLOSE_DIALOG'});
  };

  return(
    <dialog className={styles.dialog} open={isOpen}>
      <h2>{dialogTitle}</h2>
      <span>* Required</span>
      <form onSubmit={onSubmit}>
        {/* <input type="text" placeholder="Title Text Input" required /> */}
        {/* <input type="text" name={key} value={value} placeholder="Title Text Input" required /> */}
        <button type="submit">OK</button>
      </form>
    </dialog>
  );
}
