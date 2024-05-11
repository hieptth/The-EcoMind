// pages/appointments.tsx
import { mockAppointments, Appointment } from "./mockdata";
import { FC } from "react";
import styles from "./AppointmentsContent.module.css";

const AppointmentsContent: FC = () => {
  return (
    <div className={styles.container}>
      <h1>Appointments</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Scheduler</th>
            <th>Property</th>
            <th>Status</th>
            <th>Inquired at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mockAppointments.map((appointment: Appointment, index: number) => (
            <tr className={styles.eachRow} key={index}>
              <td>
                <div className={styles.scheduler}>
                  <span className={styles.schedulerName}>
                    {appointment.schedulerName}
                  </span>
                  <span className={styles.schedulerEmail}>
                    {appointment.schedulerEmail}
                  </span>
                </div>
              </td>
              <td>{appointment.propertyAddress}</td>
              <td
                className={`${styles.status} ${
                  styles[appointment.status.toLowerCase()]
                }`}
              >
                {appointment.status}
              </td>
              <td>{appointment.inquiredAt}</td>
              <td className={styles.edit}>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsContent;
