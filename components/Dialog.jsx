import { useState, useEffect } from 'react';
import styles from '../styles/dialog.module.css';

export default function Dialog({ isOpen, dispatchDialog, dialogTitle, dialogDescription, inputs, setPreview }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (inputs.length === 0) return;

    const formObject = {};
    inputs.forEach(({ name }) => {
      formObject[name] = ''
    });

    setForm(formObject);
  }, [inputs]);

  const handleOnFileChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: URL.createObjectURL(event.target.files[0])
    }));
  };

  const handleOnChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    inputs.map(({ name }) => (
      setPreview((prevState) => ({
        ...prevState,
        ...form
      }))
    ));

    dispatchDialog({
      type: 'CLOSE_DIALOG'
    });
  };

  return(
    <dialog className={styles.dialog} open={isOpen}>
      <h2>{dialogTitle}</h2>
      <span>* Required</span>
      {dialogDescription && <p>{dialogDescription}</p>}
      {isOpen &&
        <form onSubmit={onSubmit}>
          {inputs.map(({ type, accept }) =>
            Object.entries(form).map(([key, value], index) => {
              if (type === 'file') {
                return <input type={type} name={key} key={`file-${index}`} accept={accept} onChange={handleOnFileChange} required />
              }
              if (type !== 'file') {
                return <input type={type} name={key} value={value} key={`input-${index}`} onChange={handleOnChange} required />
              }
            })
          )}
          <button type="submit">OK</button>
        </form>
      }
    </dialog>
  );
}
