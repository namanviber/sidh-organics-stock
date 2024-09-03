"use client";

import { useState, useEffect } from "react";
import styles from "./lists.module.css";
import {
  SearchIcon,
  FilterAlt,
  SortByAlpha,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import Card from "../card/page";

export default function Lists({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissionFilter, setPermissionFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, permissionFilter]);

  const handleDelete = (user) => {
    console.log(`Deleting ${user.name}`);
  };

  const handleUpdate = (user) => {
    console.log(`Updating ${user.name}`);
  };

  const handleChangePermission = (user) => {
    console.log(`Changing permission for ${user.name}`);
  };

  const filteredData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (item) => !permissionFilter || item.permissions === permissionFilter
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
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

  const handlePermissionFilterChange = (permission) => {
    setPermissionFilter(permission);
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
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className={styles.filterTab}>
          <Button
            onClick={handleFilterClick}
            startIcon={<FilterAlt />}
            className={styles.filterButton}
          >
            {permissionFilter || "All Permissions"}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handlePermissionFilterChange("")}>
              All Permissions
            </MenuItem>
            {Array.from(new Set(data.map((item) => item.permissions))).map(
              (permission) => (
                <MenuItem
                  key={permission}
                  onClick={() => handlePermissionFilterChange(permission)}
                >
                  {permission}
                </MenuItem>
              )
            )}
          </Menu>
          <IconButton onClick={handleSort} className={styles.sortButton}>
            <SortByAlpha />
          </IconButton>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {paginatedData.map((user) => (
          <Card
            key={user.email}
            user={user}
            onChangePermission={handleChangePermission}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
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
