export default function InputText({ isOpen }) {
  return(
    <dialog open={isOpen}>
      <h2>Text Input</h2>
      <span>* 必填</span>
      <input type="text" placeholder="Title Text Input" required />
      <button type="submit">完成</button>
    </dialog>
  );
}
