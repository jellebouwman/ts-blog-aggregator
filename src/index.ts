import { createInterface } from "readline";
import { readConfig, setUser } from "./config";
import { CommandsRegistry } from "./types";
import { registerCommand } from "./commands";
import { loginCommand } from "./commands/login";
function main() {
  const commandsRegistry: CommandsRegistry = {};

  registerCommand(commandsRegistry, "login", loginCommand);

  const commandLineArguments = process.argv;

  const [_node, _fileName, command, ...restArguments] = commandLineArguments;

  if (command === undefined) {
    console.log("Not enough arguments were provided.");
    process.exit(1);
  }
  const commandEntry = commandsRegistry[command];

  if (commandEntry) {
    commandEntry(command, ...restArguments);
  }
}

main();
