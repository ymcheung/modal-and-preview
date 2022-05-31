import { useEffect } from 'react';
import styles from '../styles/section.module.css';

export default function Section({ dispatchDialog, preview }) {
  const sections = [
    {
      label: '上傳測驗 Logo',
      style: styles.sectionLogo,
      dialogTitle: 'Logo',
      description: '建議為寬高 2:1 圖片，寬度至少 360px',
      inputs: [
        {
          type: 'file',
          name: 'logo',
          accept: 'image/*'
        }
      ]
    },
    {
      label: '上傳測驗視覺',
      style: styles.sectionCover,
      dialogTitle: 'Cover Photo',
      inputs: [
        {
          type: 'file',
          name: 'cover',
          accept: 'image/*'
        }
      ]
    },
    {
      label: '輸入測驗名稱',
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
      style: styles.sectionBackground,
      dialogTitle: '背景圖片設定',
      description: '建議為寬高 2:1 圖片，寬度至少 360px',
      inputs: [
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

  const handlePreview = (preview, type, label) => {
    if (!preview || type === 'color') return label;
    if (type === 'file')
      return <img className={styles.previewImage} src={preview} alt="預覽圖片" />;
    if (type !== 'file') return preview;
  };

  const handlePreviewStyles = (preview, type) => {
    if (!preview && type === 'text') return styles.dialogButtonQuizName;
    if (type === 'text') return styles.dialogButtonQuizNameFilled;
    if (!preview && type === 'file') return styles.dialogButtonImage;

    return '';
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
        ({ label, style, dialogTitle, description, inputs }, index) => {
          return (
            <section className={`${styles.section} ${style}`} key={index}>
              {inputs.map(({ name, type }) => {
                return (
                  <button
                    className={`${styles.dialogButton} ${handlePreviewStyles(
                      preview[name],
                      type
                    )}`}
                    type="button"
                    onClick={() =>
                      handleOpenDialog(dialogTitle, description, inputs)
                    }
                    key={index}
                  >
                    {handlePreview(preview[name], type, label)}
                  </button>
                );
              })}
            </section>
          );
        }
      )}
    </>
  );
}