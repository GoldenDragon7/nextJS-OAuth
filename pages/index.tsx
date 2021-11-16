import useTranslation from '../hooks/useTranslation'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h1>{t("projectTitle")}</h1>
    </div>
  )
} 
