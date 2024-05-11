// mockData.ts

export interface Appointment {
  schedulerName: string;
  schedulerEmail: string;
  propertyAddress: string;
  status: "On" | "Off";
  inquiredAt: string;
}

export const mockAppointments: Appointment[] = [
  {
    schedulerName: "Esthera Jackson",
    schedulerEmail: "esthera@simmmple.com",
    propertyAddress: "255 Le Quang Sung Street, HCM City, District 1",
    status: "On",
    inquiredAt: "2021-06-14",
  },
  {
    schedulerName: "Alexa Liras",
    schedulerEmail: "alexa@simmmple.com",
    propertyAddress: "255 Le Quang Sung Street, HCM City, District 1",
    status: "Off",
    inquiredAt: "2021-06-14",
  },
  {
    schedulerName: "Laurent Michael",
    schedulerEmail: "laurent@simmmple.com",
    propertyAddress: "255 Le Quang Sung Street, HCM City, District 1",
    status: "On",
    inquiredAt: "2021-06-14",
  },
  {
    schedulerName: "Freduardo Hill",
    schedulerEmail: "freduardo@simmmple.com",
    propertyAddress: "255 Le Quang Sung Street, HCM City, District 1",
    status: "On",
    inquiredAt: "2021-06-14",
  },
  {
    schedulerName: "Daniel Thomas",
    schedulerEmail: "daniel@simmmple.com",
    propertyAddress: "255 Le Quang Sung Street, HCM City, District 1",
    status: "Off",
    inquiredAt: "2021-06-14",
  },
  {
    schedulerName: "Mark Wilson",
    schedulerEmail: "mark@simmmple.com",
    propertyAddress: "255 Le Quang Sung Street, HCM City, District 1",
    status: "Off",
    inquiredAt: "2021-06-14",
  },
  {
    schedulerName: "Jane Doe",
    schedulerEmail: "jane@simmmple.com",
    propertyAddress: "123 Nguyen Trai Street, HCM City, District 1",
    status: "On",
    inquiredAt: "2021-07-14",
  },
  {
    schedulerName: "John Smith",
    schedulerEmail: "john@simmmple.com",
    propertyAddress: "456 Nguyen Van Cu Street, HCM City, District 5",
    status: "Off",
    inquiredAt: "2021-07-15",
  },
  {
    schedulerName: "Alice Johnson",
    schedulerEmail: "alice@simmmple.com",
    propertyAddress: "789 Le Van Sy Street, HCM City, District 3",
    status: "On",
    inquiredAt: "2021-07-16",
  },
  {
    schedulerName: "Bob Brown",
    schedulerEmail: "bob@simmmple.com",
    propertyAddress: "101 Le Loi Street, HCM City, District 1",
    status: "Off",
    inquiredAt: "2021-07-17",
  },
];
