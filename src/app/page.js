"use client";

import { useState } from "react";
import styles from "../app/_ui/login.module.css";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    <Link href={"/dashboard"} />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <img src="/sidh.png" alt="Logo" className={styles.logo} />
          <Typography variant="h6" noWrap className={styles.companyName}>
            SIDH ORGANICS
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.email}>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.password}>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-White-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className={styles.login} onSubmit={handleSubmit} href="/dashboard">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
