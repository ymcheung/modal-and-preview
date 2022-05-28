import styles from '../../styles/dialog.module.css';

export default function SetBackground({ isOpen, dialogTitle }) {
  return(
    <dialog className={styles.dialog} open={isOpen}>
      <h2>{dialogTitle}</h2>
      <span>An Image of 2:1 with width of 360px at minimum is recommended</span>
      <form onSubmit="">
        <button type="file" accept="image/*" required>Select Image</button>
        <button type="submit">OK</button>
      </form>
    </dialog>
  );
}
