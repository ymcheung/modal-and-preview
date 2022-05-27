export default function UploadImage({ isOpen }) {
  return(
    <dialog open={isOpen}>
      <h2>Logo</h2>
      <span>* 必填</span>
      <button type="file" accept="image/*" required>選擇圖片</button>
      <button type="submit">完成</button>
    </dialog>
  );
}
