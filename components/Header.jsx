import styles from '../styles/header.module.css';

export default function Header() {
  return(
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <a className={styles.navListLink} href="#">
              <img src="/arrowLeft.svg" alt="上一頁" />
            </a>
          </li>
          <li>
            <a className={styles.navListLink} href="#">
              <img src="/eye.svg" alt="預覽" />
            </a>
            <a className={`${styles.navListLink} ${styles.navListLinkMore}`} href="#">
              <img src="/moreVertical.svg" alt="更多選項" />
            </a>
          </li>
        </ul>
      </nav>
      <h2 className={styles.title}>測驗封面</h2>
    </header>
  )
}
