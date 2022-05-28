import styles from '../../styles/dialog.module.css';

export default function InputText({ isOpen, dialogTitle }) {
  return(
    <dialog className={styles.dialog} open={isOpen}>
      <h2>{dialogTitle}</h2>
      <span>* Required</span>
      <input type="text" placeholder="Title Text Input" required />
      <button type="submit">OK</button>
    </dialog>
  );
}
