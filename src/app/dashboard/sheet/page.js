"use client";

import { useState } from "react";
import styles from "../../_ui/sheet/sheet.module.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";

const production_details = {
  incharge: "Naman",
  batch_size: 5000,
  reactor: "R3",
  shift: "Morning",
  date: "12-07-2003",
  product: "SAP-702",
};

const raw_material = [
  {
    name: "SIDH-25",
    tank: "Monomer",
    water: 589.25,
    stdqty: 72.2,
    actualqty: "",
  },
  { name: "BAM", tank: "Monomer", water: 0, stdqty: 1530, actualqty: "" },
  { name: "STM", tank: "Monomer", water: 0, stdqty: 584, actualqty: "" },
  {
    name: "Acrylamide",
    tank: "Monomer",
    water: 0,
    stdqty: 33.2,
    actualqty: "",
  },
  {
    name: "Acrylic Acid",
    tank: "Monomer",
    water: 0,
    stdqty: 57,
    actualqty: "",
  },
  {
    name: "OP-Paste",
    tank: "Reaction Tank",
    water: 1222,
    stdqty: 6.8,
    actualqty: "",
  },
  {
    name: "Extra Water",
    tank: "Reaction Tank",
    water: 2213,
    stdqty: 0,
    actualqty: "",
  },
];

export default function Sheet() {
  const { incharge, batch_size, reactor, shift, date, product } =
    production_details;
  console.log(product);

  const [rawMaterials, setRawMaterials] = useState(raw_material);

  const [processChecks, setProcessChecks] = useState([
    { time: "", temp: "", remark: "" },
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  const addRawMaterial = () => {
    setRawMaterials([
      ...rawMaterials,
      { name: "", tank: "", water: "", stdqty: "", actualqty: "" },
    ]);
  };

  const addProcessCheck = () => {
    setProcessChecks([...processChecks, { time: "", temp: "", remark: "" }]);
  };

  const handlePrint = () => {
    var printContents = document.getElementById("printArea").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmComplete = () => {
    setOpenDialog(false);
  };

  const handleCompleteProduction = () => {
    setOpenDialog(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{product}</h2>
        <div className={styles.headerButtons}>
          <Button onClick={handlePrint} className={styles.printButton}>
            Export Sheet
          </Button>
          <Button onClick={handleCompleteProduction} className={styles.printButton}>
            Complete Production
          </Button>
        </div>
      </div>

      <div className={styles.printArea} id="printArea">
        <div className={styles.sheet}>
          <h1 className={styles.title}>SIDH ORGANICS PVT LTD</h1>
          <h2 className={styles.subtitle}>PRODUCTION SHEET</h2>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>PRODUCT NAME:</strong> {product}
            </div>
            <div className={styles.infoItem}>
              <strong>DATE:</strong> {date}
            </div>
            <div className={styles.infoItem}>
              <strong>PRODUCTION MANAGER:</strong> {incharge}
            </div>
            <div className={styles.infoItem}>
              <strong>BATCH NUMBER:</strong> {batch_size}
            </div>
            <div className={styles.infoItem}>
              <strong>REACTOR:</strong> {reactor}
            </div>
            <div className={styles.infoItem}>
              <strong>TIME:</strong> <input type="time" />
              <HorizontalRule /> <input type="time" />
            </div>
          </div>

          <table className={styles.materialTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tank</th>
                <th>Water</th>
                <th>Std Qty</th>
                <th>Actual Qty</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((material, index) => (
                <tr key={index}>
                  <td>{material.name}</td>
                  <td>{material.tank}</td>
                  <td>{material.water}</td>
                  <td>{material.stdqty}</td>
                  <td>
                    <input
                      type="number"
                      value={material.actualqty}
                      onChange={(e) => {
                        const newMaterials = [...rawMaterials];
                        newMaterials[index].actualqty = e.target.value;
                        setRawMaterials(newMaterials);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5">
                  <Button onClick={addRawMaterial} className={styles.addButton}>
                    +
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>

          <h2 className={styles.subtitle}>Reactor Details</h2>
          <table className={styles.horizontalTable}>
            <tbody>
              <tr>
                <th>BATCH CHARGING</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>CHARGING COMPLETE</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>HEATING TIME</th>
                <td>
                  ON: <input type="time" /> OFF: <input type="time" />
                </td>
              </tr>
              <tr>
                <th>REACTION TIME</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>BATCH COMPLETION</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>DRAIN TIME</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className={styles.subtitle}>Test Report</h2>
          <table className={styles.testReportTable}>
            <tbody>
              <tr>
                <th>DATE</th>
                <td>
                  <input type="date" defaultValue={date} />
                </td>
              </tr>
              <tr>
                <th>PH</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>SOLID(%)</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>VISCOSITY(CPS)</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>APPEARANCE</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>SPECIFIC GRAVITY</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>LAB INCHARGE</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <th>PLANT SUPERVISOR</th>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className={styles.subtitle}>In Process Check Sheet</h2>

          <table className={styles.checkTable}>
            <thead>
              <tr>
                <th>TIME</th>
                <th>R-TEMP</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {processChecks.map((check, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="time"
                      value={check.time}
                      onChange={(e) => {
                        const newChecks = [...processChecks];
                        newChecks[index].time = e.target.value;
                        setProcessChecks(newChecks);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={check.temp}
                      onChange={(e) => {
                        const newChecks = [...processChecks];
                        newChecks[index].temp = e.target.value;
                        setProcessChecks(newChecks);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={check.remark}
                      onChange={(e) => {
                        const newChecks = [...processChecks];
                        newChecks[index].remark = e.target.value;
                        setProcessChecks(newChecks);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                  <Button
                    onClick={addProcessCheck}
                    className={styles.addButton}
                  >
                    +
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Complete Production</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to complete the production?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmComplete} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
