"use client";

import { useState } from "react";
import styles from "../../_ui/stock/stock.module.css";
import Table from "../../_ui/stock/table/page.js";
import { Add } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

const rawMaterial = [
  { product: "SAP-704", qty: "5000 kg", category: "Paint", status: "In Stock" },
  {
    product: "SAP-9002",
    qty: "3000 kg",
    category: "Water Proofing",
    status: "In Stock",
  },
  {
    product: "SAP-8080",
    qty: "6000 kg",
    category: "Paint",
    status: "Out of Stock",
  },
];

const finishedGoods = [
  {
    product: "BAM",
    qty: "5000 kg",
    category: "Inflammable",
    status: "In Stock",
  },
  {
    product: "VAM",
    qty: "400 kg",
    category: "Inflammable",
    status: "Out of stock",
  },
  {
    product: "Styrene",
    qty: "6000 kg",
    category: "Non Inflammable",
    status: "In Stock",
  },
];

const UpdateStockPopup = ({ isOpen, onClose, activeTab }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [operation, setOperation] = useState("add");
  const [remarks, setRemarks] = useState("");

  const products = activeTab === "rawMaterial" ? rawMaterial : finishedGoods;

  const handleUpdateStock = () => {
    console.log("Updating stock:", {
      selectedProduct,
      quantity,
      operation,
      remarks,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} classes={{ paper: styles.dialog }}>
      <DialogTitle>Update Stock</DialogTitle>
      <DialogContent>
        <div className={styles.dialogContent}>
          <Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a product
            </MenuItem>
            {products.map((p) => (
              <MenuItem key={p.product} value={p.product}>
                {p.product}
              </MenuItem>
            ))}
          </Select>

          {selectedProduct && (
            <div>
              <p className={styles.qty}>
                Current Quantity:{" "}
                {products.find((p) => p.product === selectedProduct)?.qty}
              </p>
              <div className={styles.operationButtons}>
                <Button
                  variant={operation === "add" ? "contained" : "outlined"}
                  onClick={() => setOperation("add")}
                >
                  Add
                </Button>
                <Button
                  variant={operation === "reduce" ? "contained" : "outlined"}
                  onClick={() => setOperation("reduce")}
                >
                  Reduce
                </Button>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  label="Quantity"
                />
              </div>
            </div>
          )}

          <TextField
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            label="Remarks"
            fullWidth
            multiline
            rows={2}
          />

          <Button onClick={handleUpdateStock} variant="contained" fullWidth>
            Update Stock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AddStockPopup = ({ isOpen, onClose, activeTab }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [safeQuantity, setSafeQuantity] = useState(0);

  const handleUpdateStock = () => {
    console.log("Updating stock:", {
      productName,
      quantity,
      category,
      safeQuantity,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} classes={{ paper: styles.dialog }}>
      <DialogTitle>Add Stock</DialogTitle>
      <DialogContent>
        <div className={styles.dialogContent}>
          <TextField
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            label="Product Name"
            fullWidth
          />

          <TextField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            fullWidth
          />

          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            label="Quantity"
          />

          <TextField
            type="number"
            value={safeQuantity}
            onChange={(e) => setSafeQuantity(parseInt(e.target.value))}
            label="Safe Quantity"
          />

          <Button onClick={handleUpdateStock} variant="contained" fullWidth>
            Add Stock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Stock() {
  const [activeTab, setActiveTab] = useState("rawMaterial");
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  const data = activeTab === "rawMaterial" ? rawMaterial : finishedGoods;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionTabs}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "rawMaterial" && styles.active
            }`}
            onClick={() => handleTabChange("rawMaterial")}
          >
            Raw Material
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "finishedGoods" && styles.active
            }`}
            onClick={() => handleTabChange("finishedGoods")}
          >
            Finished Goods
          </button>
        </div>
        <div className={styles.headerButtons}>
          <button
            className={styles.tab}
            onClick={() => setIsUpdatePopupOpen(true)}
          >
            <Add /> Update Stock
          </button>
          <button
            className={styles.tab}
            onClick={() => setIsAddPopupOpen(true)}
          >
            <Add /> Add New Material
          </button>
        </div>
      </div>

      <Table data={data} />

      <UpdateStockPopup
        isOpen={isUpdatePopupOpen}
        onClose={() => setIsUpdatePopupOpen(false)}
        activeTab={activeTab}
      />

      <AddStockPopup
        isOpen={isAddPopupOpen}
        onClose={() => setIsUpdatePopupOpen(false)}
        activeTab={activeTab}
      />
    </div>
  );
}
