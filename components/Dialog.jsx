import { useState, useEffect, useRef } from 'react';
import styles from '../styles/dialog.module.css';

export default function Dialog({ isOpen, dispatchDialog, dialogTitle, dialogDescription, inputs, setPreview }) {
  const dialogRef = useRef(null);
  const fileRef = useRef(null);
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

    setForm((prevState) => ({
      ...prevState,
      ...formObject
    }));
  }, []);

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

    if (event.target.name === 'fill' && /^#(?:[0-9a-f]{3}){1,2}$/i.test(event.target.value) ) {
      document.documentElement.style.setProperty(
        '--custom-background',
        event.target.value
      );
    }
  };

  const handleRemove = (formName) => {
    setForm((prevState) => ({
      ...prevState,
      [formName]: ''
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

  const handleFileForm = (forms) => {
    return forms.map(({ type, name, required }, index) =>
    (
      <div className={styles.fileFormSection} key={`file-${index}`}>
        <input id="fileUpload" className={styles.formFileUpload} type={type} name={name} ref={fileRef} onChange={handleOnFileChange} required={required} accept="image/*" />
        {
          form[name] ?
          <>
            <label htmlFor="fileUpload">
              <img className={styles.labelFileCrop} src={form[name]} alt="替換圖片" />
              <span className={styles.labelFileName}>{fileRef.current && fileRef.current.files.length > 0 ? fileRef.current.files[0].name : '選另外一張圖片'}</span>
            </label>
            <button className={styles.formFileRemove} type="button" onClick={() => handleRemove(name)}>
              <img src="/trash.svg" alt="刪除" />
            </button>
          </> :
          <label className={styles.labelFileUpload} htmlFor="fileUpload">
            <img className={styles.labelFileAddIcon} src="/plus.svg" alt="選擇" />
            選擇圖片
          </label>
        }
      </div>
    ));
  }

  const handleStringForm = (forms) => {
    return forms.map(({ name, placeholder, required }, index) =>
      <input className={styles.formText} type="text" name={name} value={form[name] ? form[name] : ''} required={required} placeholder={placeholder} onChange={handleOnChange} key={`text-${index}`} />
    );
  }

  const handleColorForm = (forms) => {
    return forms.map(({ name, placeholder, required }, index) =>
      <div key={`color-${index}`}>
        <a className={styles.labelColor} href="#page2" />
        <input className={styles.formColor} type="color" name={name} value={form[name] ? form[name] : ''} required={required} onChange={handleOnChange} />
        <input className={styles.inputColor} type="text" name={name} value={form[name] ? form[name] : ''} required={required} onChange={handleOnChange} maxLength={7} placeholder={placeholder} />
      </div>
    )
  };

  return(
    <dialog className={styles.dialog} ref={dialogRef}>
      <div className={styles.dialogForms}>
        <div id="page1" className={styles.dialogFormsPage}>
          <h2 className={styles.title}>
            {dialogTitle} <span className={styles.required}>* 必填</span>
          </h2>
          {dialogDescription && <p>{dialogDescription}</p>}
          <form onSubmit={onSubmit}>
            {
              handleFileForm(inputs.filter(({ type }) => type === 'file'))
            }
            {
              handleStringForm(inputs.filter(({ type }) => type === 'text'))
            }
            {
              handleColorForm(inputs.filter(({ type }) => type === 'color'))
            }
            <button className={styles.submit} type="submit">完成</button>
          </form>
        </div>
        {
          inputs.some(({ type }) => type === 'color') &&
          <div id="page2" className={styles.dialogFormsPage}>
            <a href="#page1">
              <img src="/arrowLeft.svg" alt="上一頁" />
            </a>
          </div>
        }
      </div>
    </dialog>
  );
}
