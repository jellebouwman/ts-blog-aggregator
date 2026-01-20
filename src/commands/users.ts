import { readConfig, setUser } from "src/config";
import { getUsers } from "src/lib/db/queries/users";

export async function usersCommand() {
  const users = await getUsers();

  if (users.length === 0) {
    console.log("No users found.");

    return;
  }

  const { currentUserName } = readConfig();

  users.forEach((user) => {
    console.log(
      `${user.name} ${user.name === currentUserName ? "(current)" : ""}`,
    );
  });
}
