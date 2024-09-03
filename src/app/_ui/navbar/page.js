"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import InventoryIcon from "@mui/icons-material/Inventory";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function NavBar({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5); // Example notification count

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className={styles.menuButton}>
        <GridViewRoundedIcon className={styles.icon} />
        <Typography variant="body1" className={styles.menuText}>
          Dashboard
        </Typography>
      </MenuItem>
      {user.role !== "technician" && (
        <MenuItem className={styles.menuButton}>
          <WarehouseIcon className={styles.icon} />
          <Typography variant="body1" className={styles.menuText}>
            Stock
          </Typography>
        </MenuItem>
      )}
      <MenuItem className={styles.menuButton}>
        <InventoryIcon className={styles.icon} />
        <Typography variant="body1" className={styles.menuText}>
          Production
        </Typography>
      </MenuItem>
      {user.role === "admin" && (
        <MenuItem className={styles.menuButton}>
          <GroupsIcon className={styles.icon} />
          <Typography variant="body1" className={styles.menuText}>
            Employee
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <appBar position="static" className={styles.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={styles.menuIconButton}
          color="inherit"
          aria-label="open drawer"
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <div className={styles.leftSection}>
          <img src="/sidh.png" alt="Logo" className={styles.logo} />
          <Typography variant="h6" noWrap className={styles.companyName}>
            SIDH ORGANICS
          </Typography>
        </div>
        <div className={styles.middleSection}>
          <Link href="/dashboard">
            <div className={styles.menuButton}>
              <GridViewRoundedIcon className={styles.icon} />
              <Typography variant="body1" className={styles.menuText}>
                Dashboard
              </Typography>
            </div>
          </Link>

          {user.role !== "technician" && (
            <Link href="/dashboard/stock">
              <div className={styles.menuButton}>
                <WarehouseIcon className={styles.icon} />
                <Typography variant="body1" className={styles.menuText}>
                  Stock
                </Typography>
              </div>
            </Link>
          )}
          <Link href="/dashboard/production">
            <div className={styles.menuButton}>
              <InventoryIcon className={styles.icon} />
              <Typography variant="body1" className={styles.menuText}>
                Production
              </Typography>
            </div>
          </Link>
          <Link href="/dashboard/employees">
            {user.role === "admin" && (
              <div className={styles.menuButton}>
                <GroupsIcon className={styles.icon} />
                <Typography variant="body1" className={styles.menuText}>
                  Employee
                </Typography>
              </div>
            )}
          </Link>
        </div>

        <div className={styles.rightSection}>
          <IconButton color="inherit">
            <SearchIcon className={styles.icon} />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon className={styles.icon} />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <div className={styles.avatar}>N</div>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
      {renderMobileMenu}
    </appBar>
  );
}
