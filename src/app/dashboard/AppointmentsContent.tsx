// pages/appointments.tsx
import { FC, useState } from "react";
import styles from "./AppointmentsContent.module.css";
import { useObservable } from "shared/useObservable";
import { Appointment, AppointmentStore } from "stores";
import { Form, Input, Modal, Select } from "antd";

const AppointmentsContent: FC = () => {
  const appointments: Appointment[] = useObservable(AppointmentStore);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFormData, setModalFormData] = useState<Appointment>({
    schedulerName: "",
    schedulerEmail: "",
    propertyAddress: "",
    status: "",
    inquiredAt: "",
  });

  const onEdit = (index: number) => {
    setModalFormData(appointments[index]);
    setIsModalVisible(true);
  };

  const onModalFormChange = (e: any) => {
    setModalFormData({
      ...modalFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
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
            {appointments.map((appointment: Appointment, index: number) => (
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
                <td>
                  <div
                    className={`${styles.status} ${
                      styles[appointment.status.toLowerCase()]
                    }`}
                  >
                    {appointment.status}
                  </div>
                </td>
                <td>{appointment.inquiredAt}</td>
                <td className={styles.edit} onClick={() => onEdit(index)}>
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Edit Appointment"
        open={isModalVisible}
        okText="Edit"
        onOk={() => setIsModalVisible(false)}
        cancelText="Cancel"
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Status">
            <Select
              fieldNames={{ label: "status", value: "status" }}
              onChange={onModalFormChange}
              placeholder="status"
              value={modalFormData.status}
            >
              <Select.Option value="Accepted">Accepted</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Name">
            <Input
              onChange={onModalFormChange}
              name="name"
              value={modalFormData.schedulerName}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              onChange={onModalFormChange}
              name="email"
              value={modalFormData.schedulerEmail}
            />
          </Form.Item>
          <Form.Item label="Property Address">
            <Input
              onChange={onModalFormChange}
              name="property"
              value={modalFormData.propertyAddress}
            />
          </Form.Item>
          <Form.Item label="Inquired At">
            <Input
              onChange={onModalFormChange}
              name="inquiredAt"
              type="date"
              value={modalFormData.inquiredAt}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AppointmentsContent;
