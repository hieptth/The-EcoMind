// dashboard.tsx
"use client";
import React, { Suspense, useState } from "react";
import styles from "./dashboard.module.css";
import { Chart, Building3, Calendar, Message, Setting2 } from "iconsax-react";
import { Spin } from "antd";
import Image from "next/image";

// Dynamic imports
const ChartsContent = React.lazy(() => import("./ChartsContent"));
const PropertiesContent = React.lazy(() => import("./PropertiesContent"));
const AppointmentsContent = React.lazy(() => import("./AppointmentsContent"));
const MessagesContent = React.lazy(() => import("./MessagesContent"));
const SettingsContent = React.lazy(() => import("./SettingsContent"));

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("charts");

  let ContentComponent;
  switch (activeSection) {
    case "charts":
      ContentComponent = ChartsContent;
      break;
    case "properties":
      ContentComponent = PropertiesContent;
      break;
    case "appointments":
      ContentComponent = AppointmentsContent;
      break;
    case "messages":
      ContentComponent = MessagesContent;
      break;
    case "settings":
      ContentComponent = SettingsContent;
      break;
    default:
      ContentComponent = () => <div>Welcome to the Dashboard</div>;
  }

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
          <Chart className={styles.icon} size="32" />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "properties" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("properties")}
        >
          <Building3 className={styles.icon} size="32" />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "appointments" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("appointments")}
        >
          <Calendar className={styles.icon} size="32" />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "messages" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("messages")}
        >
          <Message className={styles.icon} size="32" />
        </div>
        <div
          className={`${styles.iconContainer} ${
            activeSection === "settings" ? styles.active : ""
          }`}
          onClick={() => setActiveSection("settings")}
        >
          <Setting2 className={styles.icon} size="32" />
        </div>
      </aside>
      <main className={styles.content}>
        <Suspense fallback={<Spin />}>
          <ContentComponent />
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardPage;
