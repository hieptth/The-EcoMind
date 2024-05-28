import { BaseStore } from "shared";

type AccountInfo = {
  username: string;
  password: string;
  role: "user" | "agent";
  status?: number;
};

export const AccountStore = new BaseStore<AccountInfo>({
  initValue: {
    username: "",
    password: "",
    role: "user",
  },
});
