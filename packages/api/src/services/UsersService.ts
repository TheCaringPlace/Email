import { UserPersistence } from "@plunk/lib";
import { verifyHash } from "../util/hash";

export class UsersService {
  public static async verifyCredentials(email: string, password: string) {
    const user = await new UserPersistence().getByEmail(email);

    if (!user?.password) {
      return false;
    }

    return await verifyHash(password, user.password);
  }
}
