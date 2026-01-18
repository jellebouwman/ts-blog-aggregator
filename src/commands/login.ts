import { setUser } from "src/config";

export function loginCommand(commandName: string, ...args: string[]) {
  if (args.length === 0 || args[0] == "") {
    console.log("Command 'login' expects a username.");
    process.exit(1);
  }

  const username = args[0];

  if (username === "") {
    console.log("Command 'login' expects a non empty string username.");
    process.exit(1);
  }

  setUser(username);
  console.log("Set the username to " + username);
}
