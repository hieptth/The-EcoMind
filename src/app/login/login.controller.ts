import { AccountService } from "stores";

export class LoginController {
  public static async login(email: string, password: string): Promise<boolean> {
    const response = await AccountService.login(email, password);
    if (response.isLoggedIn) {
      localStorage.setItem(
        "accountInfo",
        JSON.stringify({
          email,
          role: response.role,
          username: response.username,
        })
      );
      window.location.href = "/";

      return true;
    }

    return false;
  }
}
