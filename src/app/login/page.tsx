"use client";
import React, { FormEvent } from "react";
import styles from "./LoginPage.module.css";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle the login logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <Image
          src="/login-image.png"
          alt="Login Image"
          width={500}
          height={500}
        />
      </div>
      <div className={styles.rightPane}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Image src="/logo.png" alt="Login Logo" width={100} height={100} />
          <h1>Welcome to EcoMind</h1>
          <p style={{ color: "#737d8c" }}>
            Welcome back! login with your data that you entered during
            registration.
          </p>
          <label htmlFor="email" className={styles.formLabel}>
            Email Address
          </label>
          <input type="email" placeholder="Email" />

          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          <input type="password" placeholder="Password" />

          <div className={styles.options}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Password</label>
            </div>
            <p className={styles.forgotPassword}>Forgot your password?</p>
          </div>
          <p className={styles.rememberMe}>
            Don't have an account? Sign up here
          </p>
          <button type="submit">Log In</button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
            <div>
              <p style={{ width: "70px", textAlign: "center" }}>Or</p>
            </div>

            <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
          </div>

          <div className={styles.alternateLogin}>
            <button className={styles.belowButton}>
              <span className={styles.iconWrapper}>
                <Image
                  src="/icon/google.svg"
                  alt="Google icon"
                  width={15}
                  height={15}
                  className={styles.icon}
                />
              </span>
              <span className={styles.buttonText}>Login with Google</span>
            </button>
            <button className={styles.belowButton}>
              <span className={styles.iconWrapper}>
                <Image
                  src="/icon/facebook.svg"
                  alt="Facebook icon"
                  width={15}
                  height={15}
                  className={styles.icon}
                />
              </span>
              <span className={styles.buttonText}>Login with Facebook</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
