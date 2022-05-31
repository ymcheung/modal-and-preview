import { useEffect } from 'react';
import styles from '../styles/section.module.css';

export default function Section({ dispatchDialog, preview }) {
  const sections = [
    {
      label: '上傳測驗 Logo',
      shortname: 'logo',
      style: styles.sectionLogo,
      dialogTitle: 'Logo',
      description: '建議為寬高 2:1 圖片，寬度至少 360px',
      inputs: [
        {
          type: 'file',
          name: 'logo'
        }
      ]
    },
    {
      label: '上傳測驗視覺',
      shortname: 'cover',
      style: styles.sectionCover,
      dialogTitle: 'Cover Photo',
      inputs: [
        {
          type: 'file',
          name: 'cover'
        }
      ]
    },
    {
      label: '輸入測驗名稱',
      shortname: 'quizName',
      style: styles.sectionQuizName,
      dialogTitle: 'Text Input',
      inputs: [
        {
          type: 'text',
          name: 'quizName'
        }
      ]
    },
    {
      label: '背景設定',
      shortname: 'background',
      style: styles.sectionBackground,
      dialogTitle: '背景圖片設定',
      description: '建議為寬高 2:1 圖片，寬度至少 360px',
      inputs: [
        {
          type: 'file',
          name: 'imageFill'
        },
        {
          type: 'color',
          name: 'fill'
        }
      ]
    }
  ];

  const handleOpenDialog = (dialogTitle, dialogDescription, inputs) => {
    dispatchDialog({
      type: 'OPEN_DIALOG',
      payload: {
        title: dialogTitle,
        description: dialogDescription,
        inputs: inputs
      }
    });
  };

  const handlePreview = (shortname, preview, label) => {
    switch (shortname) {
      case 'logo':
      case 'cover':
        if (!preview) {
          return label;
        }
        return <img className={styles.previewImage} src={preview} alt="預覽圖片" />;
      case 'quizName':
        if (!preview) {
          return label;
        }
        return preview;
      default:
        return label;
      }
  };

  const handlePreviewStyles = (shortname, preview) => {
    switch (shortname) {
      case 'logo':
      case 'cover':
        if (!preview) {
          return styles.dialogButtonImage;
        }
      case 'quizName':
        if (!preview) {
          return styles.dialogButtonQuizName;
        }
        return styles.dialogButtonQuizNameFilled
      default:
        return '';
    };
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--custom-background',
      preview.fill
    );
  }, [preview.fill]);

  return (
    <>
      {sections.map(
        ({ label, shortname, style, dialogTitle, description, inputs }, index) => {
          return (
            <section className={`${styles.section} ${style}`} key={index}>
              <button
                className={`${styles.dialogButton} ${handlePreviewStyles(
                  shortname, preview[shortname]
                )}`}
                type="button"
                onClick={() =>
                  handleOpenDialog(dialogTitle, description, inputs)
                }
                key={index}
              >
                {handlePreview(shortname, preview[shortname], label)}
              </button>
            </section>
          );
        }
      )}
    </>
  );
}
