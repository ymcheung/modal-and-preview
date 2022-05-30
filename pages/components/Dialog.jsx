import { useState, useEffect } from 'react';
import styles from '../../styles/dialog.module.css';

export default function Dialog({ isOpen, dispatch, dialogTitle, inputs }) {
  // console.log(inputs.forEach((input) => inputs.name))
  // const formReducer = (state, action) => {
  //   switch (action.type) {
  //     case 'TEXT':
  //       return {
  //         ...state,
  //         type: 'text',
  //         name: action.payload.name
  //       };
  //     case 'IMAGE':
  //       return {
  //         ...state,
  //         type: 'file',
  //         name: action.payload.name,
  //         accept: 'image/*'
  //       };
  //     default:
  //       return state;
  //   }
  // };

  // const [state, dispatch] = useReducer(formReducer, {
  //   type: '',
  //   name: ''
  // });

  const [form, setForm] = useState({});

  useEffect(() => {
    if (inputs.length === 0) return;

    console.log(inputs)

    const formObject = {};
    inputs.forEach(({ name }) => {
      formObject[name] = ''
    });

    setForm(formObject);
  }, [inputs]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'CLOSE_DIALOG',
      payload: {
        title: '',
        inputs: []
      }
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
              <input type={type} name={key} value={value} key={index} accept={accept} required />
            )
          )}
          <button type="submit">OK</button>
        </form>
      }
    </dialog>
  );
}
