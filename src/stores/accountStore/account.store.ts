import { registeredAccountData } from "dummy";
import { BaseStore } from "shared";

export type AccountInfo = {
  id: string;
  email: string;
  password: string;
  username?: string;
  role: "user" | "agent";
  status?: number;
}[];

export const AccountStore = new BaseStore<AccountInfo>({
  initValue: registeredAccountData,
});
