import styles from "../_ui/dashboard.module.css";
import NavBar from "../_ui/navbar/page";

export default function Layout({ children }) {
  const user = { role: "admin" };
  return (
    <div className={styles.Layout}>
      <div className={styles.Navbar}>
        {" "}
        <NavBar user={user} />
      </div>
      {children}
    </div>
  );
}
