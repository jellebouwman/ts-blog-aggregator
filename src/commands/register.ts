import { setUser } from "src/config";
import { createUser, getUser } from "src/lib/db/queries/users";

export async function registerCommand(commandName: string, ...args: string[]) {
  if (args.length === 0 || args[0] == "") {
    console.log("Command 'register' expects a username.");
    process.exit(1);
  }

  const username = args[0];

  if (username === "") {
    console.log("Command 'register' expects a non empty string username.");
    process.exit(1);
  }

  const newUser = await createUser(username);
  console.log("Created a user with username " + username);

  console.log({ newUser });

  setUser(newUser.name);
  console.log(
    `Set the newly created user with username '${newUser.name}' as the active user.`,
  );
}
