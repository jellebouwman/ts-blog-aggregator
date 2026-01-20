import { CommandsRegistry } from "./types";
import { registerCommand } from "./commands/register";
import { loginCommand } from "./commands/login";
import { addCommandToRegistry } from "./commands";
import { resetCommand } from "./commands/reset";
import { usersCommand } from "./commands/users";
import { aggregateCommand } from "./commands/aggregate";
import { addFeedCommand } from "./commands/add-feed";
import { feedsCommand } from "./commands/feeds";

async function main() {
  const commandsRegistry: CommandsRegistry = {};

  addCommandToRegistry(commandsRegistry, "addfeed", addFeedCommand);
  addCommandToRegistry(commandsRegistry, "agg", aggregateCommand);
  addCommandToRegistry(commandsRegistry, "feeds", feedsCommand);
  addCommandToRegistry(commandsRegistry, "login", loginCommand);
  addCommandToRegistry(commandsRegistry, "register", registerCommand);
  addCommandToRegistry(commandsRegistry, "reset", resetCommand);
  addCommandToRegistry(commandsRegistry, "users", usersCommand);

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
