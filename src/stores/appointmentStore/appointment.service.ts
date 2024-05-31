import { Appointment, AppointmentStore } from "./appointment.store";

export class AppointmentService {
  public static async getAppointments() {
    return AppointmentStore.getValue();
  }

  public static async addAppointment(appointment: Appointment) {
    const appointments = AppointmentStore.getValue();
    AppointmentStore.setStore([...appointments, appointment]);
  }

  public static async updateAppointment(
    appointment: Appointment,
    index: number
  ) {
    const appointments = AppointmentStore.getValue();
    appointments[index] = appointment;
    AppointmentStore.setStore(appointments);
  }

  public static async deleteAppointment(index: number) {
    const appointments = AppointmentStore.getValue();
    appointments.splice(index, 1);
    AppointmentStore.setStore(appointments);
  }
}
