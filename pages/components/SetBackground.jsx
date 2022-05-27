export default function SetBackground() {
  return(
    <dialog>
      <h2>背景圖片設定</h2>
      <span>建議為寬高 2:1 圖片，寬度至少 360px</span>
      <button type="file" accept="image/*" required>選擇圖片</button>
      <button type="submit">完成</button>
    </dialog>
  );
}
