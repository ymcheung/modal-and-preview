import styles from '../../styles/dialog.module.css';

export default function UploadImage({ isOpen, dialogTitle }) {
  return(
    <dialog className={styles.dialog} open={isOpen}>
      <h2>{dialogTitle}</h2>
      <span>* Required</span>
      <form onSubmit="">
        <button type="file" accept="image/*" required>Select Image</button>
        <button type="submit">OK</button>
      </form>
    </dialog>
  );
}
