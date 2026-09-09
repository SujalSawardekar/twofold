import styles from './StatCard.module.css';

export default function StatCard({ number, label, theme = 'dark' }) {
  return (
    <div className={`${styles.card} ${styles[theme] || ''}`.trim()}>
      <div className={styles.number}>{number}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
