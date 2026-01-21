import {
  addCommandToRegistry,
  addFeedCommand,
  aggregateCommand,
  browseCommand,
  feedsCommand,
  followCommand,
  followingCommand,
  loginCommand,
  registerCommand,
  resetCommand,
  unfollowCommand,
  usersCommand,
} from "./commands";
import { middlewareLoggedIn } from "./middleware";
import { CommandsRegistry } from "./types";

async function main() {
  const commandsRegistry: CommandsRegistry = {};

  addCommandToRegistry(
    commandsRegistry,
    "addfeed",
    middlewareLoggedIn(addFeedCommand),
  );
  addCommandToRegistry(commandsRegistry, "agg", aggregateCommand);
  addCommandToRegistry(
    commandsRegistry,
    "browse",
    middlewareLoggedIn(browseCommand),
  );
  addCommandToRegistry(commandsRegistry, "feeds", feedsCommand);
  addCommandToRegistry(
    commandsRegistry,
    "follow",
    middlewareLoggedIn(followCommand),
  );
  addCommandToRegistry(
    commandsRegistry,
    "following",
    middlewareLoggedIn(followingCommand),
  );
  addCommandToRegistry(commandsRegistry, "login", loginCommand);
  addCommandToRegistry(commandsRegistry, "register", registerCommand);
  addCommandToRegistry(commandsRegistry, "reset", resetCommand);
  addCommandToRegistry(
    commandsRegistry,
    "unfollow",
    middlewareLoggedIn(unfollowCommand),
  );
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
