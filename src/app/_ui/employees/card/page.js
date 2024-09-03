import styles from "./card.module.css";

const colorClasses = [styles.col1, styles.col2, styles.col3, styles.col4];

export default function Card({
  user,
  onChangePermission,
  onUpdate,
  onDelete,
}) {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  const randomColorClass =
    colorClasses[Math.floor(Math.random() * colorClasses.length)];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.avatar} ${randomColorClass}`}>
          {getInitials(user.name)}
        </div>
        <div className={styles.headerInfo}>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.email}>{user.email}</p>
        </div>
        <div
          className={`${styles.status} ${
            user.status.toLowerCase() === "active" ? styles.active : ""
          }`}
        >
          {user.status}
        </div>
      </div>
      <div className={styles.details}>
        <p>
          <strong>Designation:</strong> {user.designation}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Date:</strong> {user.date}
        </p>
        <p>
          <strong>Permissions:</strong> {user.permissions}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          onClick={() => onChangePermission(user)}
          className={styles.changePermission}
        >
          Manage Permissions
        </button>
        <button onClick={() => onUpdate(user)} className={styles.update}>
          Update
        </button>
        <button onClick={() => onDelete(user)} className={styles.delete}>
          Delete
        </button>
      </div>
    </div>
  );
}
