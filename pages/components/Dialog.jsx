import { useState, useEffect } from 'react';
import styles from '../../styles/dialog.module.css';

export default function Dialog({ isOpen, dispatchDialog, dialogTitle, inputs, dispatchPreview }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (inputs.length === 0) return;

    const formObject = {};
    inputs.forEach(({ name }) => {
      formObject[name] = ''
    });

    setForm(formObject);
  }, [inputs]);

  const handleOnChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatchPreview({
      type: 'QUIZ_NAME',
      payload: form
    });

    dispatchDialog({
      type: 'CLOSE_DIALOG'
    });
  };

  return(
    <dialog className={styles.dialog} open={isOpen}>
      <h2>{dialogTitle}</h2>
      <span>* Required</span>
      {isOpen &&
        <form onSubmit={onSubmit}>
          {inputs.map(({ type, accept }) =>
            Object.entries(form).map(([key, value], index) =>
              <input type={type} name={key} value={value} key={index} accept={accept} onChange={handleOnChange} required />
            )
          )}
          <button type="submit">OK</button>
        </form>
      }
    </dialog>
  );
}
