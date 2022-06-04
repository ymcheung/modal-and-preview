import { useState, useEffect, useRef, Fragment } from 'react';
import styles from '../styles/dialog.module.css';

export default function Dialog({ isOpen, dispatchDialog, dialogTitle, dialogDescription, inputs, setPreview }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.removeAttribute('open');

    isOpen ? dialog.showModal() : dialog.close();
    return () => dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (inputs.length === 0) return;

    const formObject = {};
    inputs.forEach(({ name }) => {
      formObject[name] = '';
    });

    setForm(formObject);
  }, [setForm]);

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

    inputs.map(() => (
      setPreview((prevState) => ({
        ...prevState,
        ...form
      }))
    ));

    dispatchDialog({
      type: 'CLOSE_DIALOG'
    });
  };

  const handleFileForm = () => {
    const forms = inputs.filter(({ type }) => type === 'file');

    return forms.map(({ type, name, required }, index) =>
    (
      <Fragment key={`file-${index}`}>
        <label className={styles.labelFileUpload} htmlFor="fileUpload">選擇圖片</label>
        <input id="fileUpload" className={styles.formFileUpload} type={type} name={name} accept="image/*" onChange={handleOnFileChange} required={required} />
      </Fragment>
    ));
  }

  const handleStringForm = () => {
    const forms = inputs.filter(({ type }) => type === 'text');

    return forms.map(({ name, placeholder, required }, index) =>
      <input className={styles.formText} type="text" name={name} value={form[name] ? form[name] : ''} required={required} placeholder={placeholder} onChange={handleOnChange} key={`text-${index}`} />
    );
  }

  const handleColorForm = () => {
    const forms = inputs.filter(({ type }) => type === 'color');

    return forms.map(({ name, placeholder, required }, index) =>
      <Fragment key={`color-${index}`}>
        <input type="color" name={name} value={form[name] ? form[name] : ''} required={required} onChange={handleOnChange} />
        <input className={styles.labelColor} type="text" name={name} value={form[name] ? form[name] : ''} required={required} onChange={handleOnChange} placeholder={placeholder} />
      </Fragment>
    )
  };

  return(
    <dialog className={styles.dialog} ref={dialogRef}>
      <h2 className={styles.title}>
        {dialogTitle} <span className={styles.required}>* 必填</span>
      </h2>
      {dialogDescription && <p>{dialogDescription}</p>}
      {isOpen &&
        <form onSubmit={onSubmit}>
          {handleFileForm()}
          {handleStringForm()}
          {handleColorForm()}
          <button className={styles.submit} type="submit">完成</button>
        </form>
      }
    </dialog>
  );
}
