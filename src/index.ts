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
    "register",
    registerCommand,
    "Create a new user account",
  );
  addCommandToRegistry(
    commandsRegistry,
    "login",
    loginCommand,
    "Log in as an existing user",
  );
  addCommandToRegistry(
    commandsRegistry,
    "users",
    usersCommand,
    "List all registered users",
  );
  addCommandToRegistry(
    commandsRegistry,
    "addfeed",
    middlewareLoggedIn(addFeedCommand),
    "Add a new RSS feed and follow it",
  );
  addCommandToRegistry(
    commandsRegistry,
    "feeds",
    feedsCommand,
    "List all available feeds",
  );
  addCommandToRegistry(
    commandsRegistry,
    "follow",
    middlewareLoggedIn(followCommand),
    "Follow an existing feed",
  );
  addCommandToRegistry(
    commandsRegistry,
    "unfollow",
    middlewareLoggedIn(unfollowCommand),
    "Unfollow a feed",
  );
  addCommandToRegistry(
    commandsRegistry,
    "following",
    middlewareLoggedIn(followingCommand),
    "List feeds you are following",
  );
  addCommandToRegistry(
    commandsRegistry,
    "browse",
    middlewareLoggedIn(browseCommand),
    "View latest posts from followed feeds",
  );
  addCommandToRegistry(
    commandsRegistry,
    "agg",
    aggregateCommand,
    "Start continuous feed aggregation",
  );
  addCommandToRegistry(
    commandsRegistry,
    "reset",
    resetCommand,
    "Reset all user data (WARNING: destructive)",
  );

  // Help command
  addCommandToRegistry(
    commandsRegistry,
    "help",
    async () => {
      console.log("Available commands:\n");
      Object.entries(commandsRegistry)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([cmd, info]) => {
          console.log(`  ${cmd.padEnd(12)} - ${info.description}`);
        });
      console.log("\nUsage: npm start <command> [arguments]");
    },
    "Show this help message",
  );

  const commandLineArguments = process.argv;

  const [_node, _fileName, command, ...restArguments] = commandLineArguments;

  if (command === undefined) {
    console.log("Not enough arguments were provided.");
    console.log('Run "npm start help" for available commands.');
    process.exit(1);
  }
  const commandEntry = commandsRegistry[command];

  if (commandEntry) {
    await commandEntry.handler(command, ...restArguments);
  } else {
    console.log("Unknown command, exiting.");
    console.log('Run "npm start help" for available commands.');
    process.exit(1);
  }

  process.exit(0);
}

main();
