import styles from '../../styles/dialog.module.css';

export default function UploadImage({ isOpen }) {
  return(
    <dialog className={styles.dialog} open={isOpen}>
      <h2>Logo</h2>
      <span>* Required</span>
      <button type="file" accept="image/*" required>Select Image</button>
      <button type="submit">OK</button>
    </dialog>
  );
}
