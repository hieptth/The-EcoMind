// dashboard.tsx
"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { Spin } from "antd";
import { Chart, Building3, Calendar, Message, Setting2 } from "iconsax-react";
import styles from "./dashboard.module.css";

// Dynamic imports for dashboard content
const ChartsContent = React.lazy(() => import("./ChartsContent"));
const PropertiesContent = React.lazy(() => import("./PropertiesContent"));
const AppointmentsContent = React.lazy(() => import("./AppointmentsContent"));
const MessagesContent = React.lazy(() => import("./MessagesContent"));
const SettingsContent = React.lazy(() => import("./SettingsContent"));

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("charts");

  const getContentComponent = () => {
    switch (activeSection) {
      case "charts":
        return ChartsContent;
      case "properties":
        return PropertiesContent;
      case "appointments":
        return AppointmentsContent;
      case "messages":
        return MessagesContent;
      case "settings":
        return SettingsContent;
      default:
        return () => <div>Welcome to the Dashboard</div>;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "charts" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("charts")}
        >
          <Chart
            size="32"
            color={activeSection === "charts" ? "black" : "gray"}
          />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "properties" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("properties")}
        >
          <Building3
            color={activeSection === "properties" ? "black" : "gray"}
            className={styles.icon}
            size="32"
          />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "appointments" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("appointments")}
        >
          <Calendar
            color={activeSection === "appointments" ? "black" : "gray"}
            className={styles.icon}
            size="32"
          />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "messages" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("messages")}
        >
          <Message
            color={activeSection === "messages" ? "black" : "gray"}
            className={styles.icon}
            size="32"
          />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "settings" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("settings")}
        >
          <Setting2
            color={activeSection === "settings" ? "black" : "gray"}
            className={styles.icon}
            size="32"
          />
        </div>
      </aside>
      <main className={styles.content}>
        <Suspense fallback={<Spin />}>
          {React.createElement(getContentComponent())}
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardPage;
