import { dummyAppointment } from "dummy";
import { BaseStore } from "shared";

export type Appointment = {
  schedulerName: string;
  schedulerEmail: string;
  propertyAddress: string;
  status: string;
  inquiredAt: string;
};

export const AppointmentStore = new BaseStore<Appointment[]>({
  initValue: dummyAppointment,
});
