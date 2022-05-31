import Head from 'next/head';
import { useState, useReducer, useEffect } from 'react';
import styles from '../styles/Home.module.css';

import Header from '../components/Header';
import Section from '../components/Section';
import Dialog from '../components/Dialog';

export default function Home() {
  const dialogReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_DIALOG':
        return {
          ...state,
          isOpen: true,
          title: action.payload.title,
          description: action.payload.description,
          inputs: action.payload.inputs
        };

      case 'CLOSE_DIALOG':
        return {
          ...state,
          isOpen: false,
          title: '',
          inputs: []
        };

      default:
        return state;
    }
  };

  const [dialogState, dispatchDialog] = useReducer(dialogReducer, {
    isOpen: false,
    title: '',
    description: '',
    inputs: []
  });

  const [preview, setPreview] = useState({
    logo: '',
    cover: '',
    quizName: '',
    fill: ''
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.container}>
        <Section dispatchDialog={dispatchDialog} preview={preview} />
      </main>
      <Dialog
        isOpen={dialogState.isOpen}
        dispatchDialog={dispatchDialog}
        dialogTitle={dialogState.title}
        dialogDescription={dialogState.description}
        inputs={dialogState.inputs}
        setPreview={setPreview}
      />
    </>
  );
}
