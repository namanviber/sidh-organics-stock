import styles from "../../_ui/employees/employees.module.css";
import Lists from "../../_ui/employees/lists/page.js";
import { Add, OpenInNew, OpenInNewRounded } from "@mui/icons-material";

const data = [
  {
    date: "12-07-2003",
    name: "Naman Jain",
    permissions: "Admin",
    email: "naman@gmail.com",
    designation: "Technical Head",
    phone: "1234567890",
    status: "Active",
  },
  {
    date: "12-07-2003",
    name: "Naman Jain",
    permissions: "Admin",
    email: "naman@gmail.com",
    designation: "Technical Head",
    phone: "1234567890",
    status: "Active",
  },
  {
    date: "12-07-2003",
    name: "Naman Jain",
    permissions: "Admin",
    email: "naman@gmail.com",
    designation: "Technical Head",
    phone: "1234567890",
    status: "Active",
  },
];

export default function Production() {
  return (
    <div className={styles.container}>
      <div className={styles.actionTabs}>
        <div className={styles.header}>Employee Details</div>
        <button className={styles.tab}>
          <Add /> Add Employee
        </button>
      </div>

      <Lists data={data} />
    </div>
  );
}
