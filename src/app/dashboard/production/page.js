import Card from "@/app/_ui/production/card/page";
import styles from "../../_ui/production/production.module.css";
import Table from "../../_ui/production/table/page.js";
import { Add, OpenInNew, OpenInNewRounded } from "@mui/icons-material";
import Link from "next/link";

const production = [
  {
    date: "12-07-2003",
    product: "SAP-702",
    size: 5000,
    incharge: "Naman",
    status: "Ongoing",
    reactor: "R3",
  },
  {
    date: "12-07-2003",
    product: "SAP-702",
    size: 5000,
    incharge: "Naman",
    status: "Scheduled",
    reactor: "R2",
  },
  {
    date: "12-07-2003",
    product: "SAP-702",
    size: 5000,
    incharge: "Naman",
    status: "Ongoing",
    reactor: "R3",
  },
];

const data = {
  ongoing: 5,
  idle: 1,
  maintanance: 1,
};

export default function Production() {
  return (
    <div className={styles.container}>
      <div className={styles.actionTabs}>
        <Card data={data} />
        <div className={styles.tabs}>
          <button className={styles.tab}>
            <Add /> Add Production
          </button>
          <Link href="/dashboard/sheet">
            <button className={styles.tab}>
              <OpenInNewRounded /> Production Sheet
            </button>
          </Link>
        </div>
      </div>

      <Table data={production} />
    </div>
  );
}
