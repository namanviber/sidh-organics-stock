import styles from "./card.module.css";

export default function({ data }){
  const statuses = [
    { label: 'Ongoing', value: data.ongoing, colorClass: styles.ongoing },
    { label: 'Idle', value: data.idle, colorClass: styles.idle },
    { label: 'Maintenance', value: data.maintanance, colorClass: styles.maintenance },
  ];

  return (
    <div className={styles.container}>
      {statuses.map((status, index) => (
        <div key={status.label} className={styles.statusGroup}>
          <span className={styles.label}>{status.label}</span>
          <span className={`${styles.value} ${status.colorClass}`}>{status.value}</span>
        </div>
      ))}
    </div>
  );
};