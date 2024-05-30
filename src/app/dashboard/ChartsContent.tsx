// ChartsContent.tsx
import React, { useState, useEffect } from "react";
import { useObservable } from "shared/useObservable";
import { PropertyStore } from "stores/propertyStore";
import { Row, Col, Card, Button } from "antd";
import { CSVLink } from "react-csv";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import styles from "./ChartsContent.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function cleanPrice(price: string) {
  return parseFloat(price.replace(/[\$,]/g, ""));
}

export default function ChartsContent() {
  const properties = useObservable(PropertyStore);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    if (properties) {
      setTotalProperties(properties.length);
      const revenue = properties.reduce(
        (acc, curr) => acc + cleanPrice(curr.price),
        0
      );
      setTotalRevenue(revenue);
      setTotalInterest(revenue * 0.05);
    }
  }, [properties]);

  const exportData = [
    { header: "Total Property", value: totalProperties },
    { header: "Total Revenue", value: totalRevenue.toFixed(2) },
    { header: "Total Interest", value: totalInterest.toFixed(2) },
  ];

  const headers = [
    { label: "Header", key: "header" },
    { label: "Value", key: "value" },
  ];

  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: exportData,
  };

  const dataBar = {
    labels: properties.map((prop) => prop.id),
    datasets: [
      {
        label: "Property Price",
        data: properties.map((prop) => cleanPrice(prop.price)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataDoughnut = {
    labels: ["Total Revenue", "Total Interest"],
    datasets: [
      {
        label: "Revenue and Interest",
        data: [totalRevenue, totalInterest],
        backgroundColor: ["#42A5F5", "#66BB6A"],
        hoverBackgroundColor: ["#64B5F6", "#81C784"],
      },
    ],
  };

  return (
    <div className={styles.statsContainer}>
      <Row gutter={16} className={styles.topStats}>
        <Col span={8}>
          <Card
            title="Total Property"
            bordered={false}
            className={styles.statCard}
          >
            {totalProperties}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Total Revenue"
            bordered={false}
            className={styles.statCard}
          >
            ${totalRevenue.toFixed(2)}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Total Interest"
            bordered={false}
            className={styles.statCard}
          >
            ${totalInterest.toFixed(2)}
          </Card>
        </Col>
      </Row>
      <div className={styles.chartArea}>
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: "right" }}>
            <CSVLink {...csvReport} className="ant-btn ant-btn-primary">
              Export Report
            </CSVLink>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div className={styles.chartContainer}>
              <Bar
                data={dataBar}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.chartContainer}>
              <Doughnut
                data={dataDoughnut}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
