import { CommandsRegistry } from "./types";
import { registerCommand } from "./commands/register";
import { loginCommand } from "./commands/login";
import { addCommandToRegistry } from "./commands";

async function main() {
  const commandsRegistry: CommandsRegistry = {};

  addCommandToRegistry(commandsRegistry, "login", loginCommand);
  addCommandToRegistry(commandsRegistry, "register", registerCommand);

  const commandLineArguments = process.argv;

  const [_node, _fileName, command, ...restArguments] = commandLineArguments;

  if (command === undefined) {
    console.log("Not enough arguments were provided.");
    process.exit(1);
  }
  const commandEntry = commandsRegistry[command];

  if (commandEntry) {
    await commandEntry(command, ...restArguments);
  } else {
    console.log("Unknown command, exiting.");
    process.exit(1);
  }

  process.exit(0);
}

main();
