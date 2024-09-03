"use client";

import { useState, useEffect } from "react";
import { Checkbox, IconButton, Button, Menu, MenuItem } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBackIos,
  ArrowForwardIos,
  FilterAlt,
  Search as SearchIcon,
  Sort as SortIcon,
  SortByAlpha,
} from "@mui/icons-material";
import styles from "./Table.module.css";

export default function Table({ data }) {
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((item) => item.product);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDelete = (product) => {
    // Implement delete functionality here
    console.log(`Deleting ${product}`);
  };

  const handleUpdate = (product) => {
    // Implement update functionality here
    console.log(`Updating ${product}`);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const filteredData = data
    .filter((item) =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => !categoryFilter || item.category === categoryFilter)
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.product.localeCompare(b.product);
      } else {
        return b.product.localeCompare(a.product);
      }
    });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilter(category);
    setAnchorEl(null);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers.map((number, index) =>
      number === "ellipsis" ? (
        <span key={`ellipsis-${index}`} className={styles.ellipsis}>
          ...
        </span>
      ) : (
        <button
          key={number}
          onClick={() => handleChangePage(number)}
          className={`${styles.pageButton} ${
            currentPage === number ? styles.active : ""
          }`}
          disabled={currentPage === number}
        >
          {number}
        </button>
      )
    );
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filterSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchIcon />
        </div>

        <div className={styles.filterTab}>
          <Button
            onClick={handleFilterClick}
            startIcon={<FilterAlt />}
            className={styles.filterButton}
          >
            {categoryFilter || "All Categories"}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleCategoryFilterChange("")}>
              All Categories
            </MenuItem>
            {Array.from(new Set(data.map((item) => item.category))).map(
              (category) => (
                <MenuItem
                  key={category}
                  onClick={() => handleCategoryFilterChange(category)}
                >
                  {category}
                </MenuItem>
              )
            )}
          </Menu>
          <IconButton onClick={handleSort} className={styles.sortButton}>
            <SortByAlpha />
          </IconButton>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
              />
            </th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => {
            const isItemSelected = isSelected(row.product);
            return (
              <tr
                key={row.product}
                className={isItemSelected ? styles.selected : ""}
              >
                <td>
                  <Checkbox
                    checked={isItemSelected}
                    onClick={() => handleClick(row.product)}
                  />
                </td>
                <td>{row.product}</td>
                <td>{row.qty}</td>
                <td>{row.category}</td>
                <td>{row.status}</td>
                <td>
                  <IconButton onClick={() => handleUpdate(row.product)}>
                    <EditIcon className={styles.iconButton} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.product)}>
                    <DeleteIcon className={styles.iconButton} />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <div className={styles.totalRecords}>
          Total Records: {filteredData.length}
        </div>
        <div className={styles.pageButtons}>
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            <ArrowBackIos />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            <ArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
}
