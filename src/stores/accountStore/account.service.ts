import { AccountStore } from "./account.store";

export class AccountService {
  public static async login(
    email: string,
    password: string
  ): Promise<{ isLoggedIn: boolean; role: string; username: string }> {
    return new Promise((resolve) => {
      const accounts = AccountStore.getValue();
      const account = accounts.find(
        (account) => account.email === email && account.password === password
      );

      resolve({
        isLoggedIn: account !== undefined,
        role: account?.role || "",
        username: account?.username || "",
      });
    });
  }

  public static async logout(): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.removeItem("accountInfo");
      resolve(true);
    });
  }

  public static async register(
    email: string,
    password: string
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const accounts = AccountStore.getValue();
      const account = accounts.find((account) => account.email === email);

      if (account) {
        resolve(false);
      } else {
        AccountStore.updateStore([
          ...accounts,
          {
            id: String(accounts.length + 1),
            email,
            password,
            role: "user",
          },
        ]);
        resolve(true);
      }
    });
  }
}
