import { setUser } from "src/config";
import { getUser } from "src/lib/db/queries/users";

export async function loginCommand(commandName: string, ...args: string[]) {
  if (args.length === 0 || args[0] == "") {
    console.log("Command 'login' expects a username.");
    process.exit(1);
  }

  const username = args[0];

  if (username === "") {
    console.log("Command 'login' expects a non empty string username.");
    process.exit(1);
  }

  const user = await getUser(username);

  if (user === undefined) {
    throw new Error(`Error: User with username '${username}' does not exist.`);
  }

  setUser(user.name);
  console.log("Set the username to " + username);
}
