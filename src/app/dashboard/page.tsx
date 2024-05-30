"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Spin } from "antd";
import { Chart, Building3, Calendar, Message, Setting2 } from "iconsax-react";
import styles from "./dashboard.module.css";

const ChartsContent = React.lazy(() => import("./ChartsContent"));
const PropertiesContent = React.lazy(() => import("./PropertiesContent"));
const AppointmentsContent = React.lazy(() => import("./AppointmentsContent"));
const MessagesContent = React.lazy(() => import("./MessagesContent"));
const SettingsContent = React.lazy(() => import("./SettingsContent"));

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("charts");

  useEffect(() => {
    window.history.pushState({}, "", `/dashboard/${activeSection}`);
  }, [activeSection]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

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
        {["charts", "properties", "appointments", "messages", "settings"].map(
          (section) => (
            <div
              key={section}
              className={`${styles.iconContainer} ${
                activeSection === section ? styles.active : ""
              }`}
              onClick={() => handleSectionChange(section)}
            >
              {section === "charts" && (
                <Chart
                  size="32"
                  color={activeSection === "charts" ? "black" : "gray"}
                />
              )}
              {section === "properties" && (
                <Building3
                  size="32"
                  color={activeSection === "properties" ? "black" : "gray"}
                />
              )}
              {section === "appointments" && (
                <Calendar
                  size="32"
                  color={activeSection === "appointments" ? "black" : "gray"}
                />
              )}
              {section === "messages" && (
                <Message
                  size="32"
                  color={activeSection === "messages" ? "black" : "gray"}
                />
              )}
              {section === "settings" && (
                <Setting2
                  size="32"
                  color={activeSection === "settings" ? "black" : "gray"}
                />
              )}
            </div>
          )
        )}
      </aside>
      <main className={styles.content}>
        <Suspense fallback={<Spin size="large" />}>
          {React.createElement(getContentComponent())}
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardPage;
